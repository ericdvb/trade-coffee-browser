import { NextResponse } from "next/server";
import whileWithAcc from "@/app/utils/whileWithAcc";
import roastersSet from "@/app/utils/roastersSet";
import { prisma } from "@/lib/prisma";
import { coffeeToDB, roasterToDB } from "@/app/utils/coffeeDecorator";
import FetchError from "@/app/utils/fetchError";
import requestBody from "./requestParams.json";

export async function GET() {
  debugger;
  console.log("called the coffees route");
  const requestMethod = "POST";
  const headers = {
    "Content-Type": "application/json",
  };

  async function processData(index: number, acc: []) {
    console.log("accumulator length ", acc.length);
    console.log(`requesting page ${index} coffees`);
    try {
      const res = await fetch(
        "https://www.drinktrade.com/api/handleCatalogFilter",
        {
          method: requestMethod,
          body: JSON.stringify({
            ...requestBody,
            pageNumber: requestBody.pageNumber + index,
          }),
          headers,
          next: {
            revalidate: 60 * 60 * 24,
          },
        }
      );
      const responseText = await res.text();
      //console.log("response text inside coffees route", responseText);
      if (!res.ok) {
        throw new FetchError(
          `error fetching page ${
            requestBody.pageNumber + index
          } of coffees, response:`,
          res
        );
      }
      const dateHeader = res.headers.get("Date");
      const nextResponseJson = JSON.parse(responseText);
      nextResponseJson.results = nextResponseJson.results.map((coffee) => ({
        ...coffee,
        fetchedAtTime: dateHeader,
      }));
      return {
        nextData: nextResponseJson,
        nextAcc: acc.concat(nextResponseJson.results),
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  function gotAllResults(
    responseJson: { total_count: number; results: [] },
    acc: []
  ) {
    return acc.length >= responseJson.total_count;
  }

  let coffees = [];
  try {
    coffees = await whileWithAcc([], gotAllResults, processData);
  } catch (e) {
    console.log(e);
    if (e instanceof FetchError)
      console.log(
        "Error fetching coffees from trade, returning latest results from database"
      );
    else console.log("Unknown error fetching coffees from trade", e);
    return NextResponse.json({
      coffees: await prisma.coffee.findMany(),
      roasters: await prisma.roaster.findMany(),
    });
  }

  try {
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
      const roaster = roasterDbRows.find(
        (roaster: any) => roaster.name === coffee.brand.name
      );
      return await prisma.coffee.upsert({
        create: {
          ...dbCoffee,
          roaster: {
            connect: {
              id: roaster.id,
            },
          },
        },
        update: {
          ...dbCoffee,
          roaster: {
            connect: {
              id: roaster.id,
            },
          },
        },
        where: {
          coffeeNameRoasterKey: {
            coffeeName: dbCoffee.coffeeName,
            roasterId: roaster.id,
          },
        },
      });
    });

    // create all the coffee records
    let coffeeDbRows = [];
    coffeeDbRows = await Promise.all(coffeesWithRoasterIds);
    return NextResponse.json({
      coffees: coffeeDbRows,
      roasters: roasterDbRows,
    });
  } catch (e) {
    console.error(e);
    if (
      e.constructor.name === "PrismaClientKnownRequestError" &&
      e.message.includes("Unique constraint failed")
    ) {
      return NextResponse.json({
        coffees: await prisma.coffee.findMany(),
        roasters: roasterDbRows,
      });
    }
  }
}
