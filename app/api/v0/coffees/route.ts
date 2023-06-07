import { NextResponse } from 'next/server'
import whileWithAcc from "@/app/utils/whileWithAcc"
import roastersSet from "@/app/utils/roastersSet"
import { prisma } from "@/lib/prisma"
import { coffeeToDB, roasterToDB } from "@/app/utils/coffeeDecorator"
import FetchError from "@/app/utils/fetchError"
import requestBody from "./requestParams.json";
//import coffees from "../../../../sampledataallcoffees.js";

export async function GET() {
  console.log('called the coffees route')
  const requestMethod = 'POST';
  const headers = {
    "Content-Type": "application/json"
  }

  async function processData(index: number, acc: []) {
    console.log('accumulator length ', acc.length);
    console.log(`requesting page ${index} coffees`);
    try {
      const res = await fetch("https://www.drinktrade.com/api/handleCatalogFilter", {
        method: requestMethod,
        body: JSON.stringify({
          ...requestBody,
          pageNumber: requestBody.pageNumber + index,
        }),
        headers,
        next: {
          revalidate: 60*60*24,
        }
      });
      if (!res.ok) {
        throw new FetchError(`error fetching page ${requestBody.pageNumber+ index} of coffees, response:` res)
      }
      const dateHeader = res.headers.get('Date');
      const nextResponseJson = await res.json();
      nextResponseJson.results = nextResponseJson.results.map(coffee => ({ ...coffee, fetchedAtTime: dateHeader }));
    } catch (e) {
      console.error(e);
      throw e;
    }
    return {
      nextData: nextResponseJson,
      nextAcc: acc.concat(nextResponseJson.results)
    };
  } 

  function gotAllResults(responseJson: { total_count: number, results: [] }, acc: []) {
    return acc.length >= responseJson.total_count;
  }

  try {
    const coffees = await whileWithAcc(
      [],
      gotAllResults,
      processData,
    )
  } catch (e) {
    if (e instanceof FetchError) {
      console.error('Error fetching coffees from trade, returning latest results from database');
      return NextResponse.json(await prisma.coffee.findMany());
    }
  }

  // create roasters if they don't exist, update if they do
  const roasterSetData = roastersSet(coffees); 
  const roasters = roasterSetData.map(async (roaster: any) => {
    const dbRoaster = roasterToDB(roaster);
    return await prisma.roaster.upsert({
      where: { name: dbRoaster.name },
      create: dbRoaster,
      update: dbRoaster,
    });
  });
  const roasterDbRows = await Promise.all(roasters);

  const coffeesWithRoasterIds = coffees.map(async (coffee: any) => {
    const dbCoffee = coffeeToDB(coffee);
    const roaster = roasterDbRows.find((roaster: any) => roaster.name === coffee.brand.name);
    return await prisma.coffee.upsert({
      create: {
        ...dbCoffee,
        roaster: {
          connect: {
            id: roaster.id
          }
        }
      },
      update: {
        ...dbCoffee,
        roaster: {
          connect: {
            id: roaster.id
          }
        }
      },
      where: {
        coffeeNameRoasterKey: {
          coffeeName: dbCoffee.coffeeName,
          roasterId: roaster.id
        }
      }
    })
  })

  // create all the coffee records
  const coffeeDbRows = await Promise.all(coffeesWithRoasterIds);
  return NextResponse.json(coffeeDbRows);
}
