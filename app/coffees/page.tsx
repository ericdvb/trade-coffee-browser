import CoffeeTable from './CoffeeTable'

export default async function Page() {
  try {
    const response = await fetch('http://localhost:3000/api/v0/coffees')
    const { roasters, coffees } = await response.json();

    const joinedCoffeesAndRoasters = coffees.map(coffee => {
      return {
        ...coffee,
        roaster: roasters.find(roaster => roaster.id === coffee.roasterId),
      }
    });
    
    return <section className="relative z-0">
        <CoffeeTable data={joinedCoffeesAndRoasters}/>
      </section>;
  } catch (e) {
    console.error('error fetching coffees', e);
  }

  return <></>

}
