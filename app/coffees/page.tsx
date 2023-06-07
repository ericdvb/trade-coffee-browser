export default async function Page() {
  const response = await fetch('http://localhost:3000/api/v0/coffees', { cache: 'no-store' })
  const coffeeData = await response.json()
  return <div>
    <h1>Coffees:</h1>
    <div>{JSON.stringify(coffeeData)}</div>
  </div>
}
