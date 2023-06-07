export default function roastersSet(coffeeData) {
  const roasters = coffeeData.map(coffee => coffee.brand);
  return roasters.filter((roaster, index, array) =>
    index === array.findIndex(r => r.name === roaster.name))
}

