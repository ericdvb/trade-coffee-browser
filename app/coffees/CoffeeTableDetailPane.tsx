import Image from 'next/image'
import { Box, Typography } from '@mui/material'

export default function CoffeeTableDetailPane({row}) {
  return <Box style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 3fr', gridTemplateRows:'1fr 2fr 2fr' }}>
    <div style={{ width: 400, height: 350, position: 'relative', gridRow: '1 / span 2' }}>
      <Image src={row.original.coffeeImageURI} width="400" height="350" alt={`Picture of ${row.original.coffeeName} package`} style={{
        position: 'absolute',
        width: '150%',
        height: '150%',
        maxWidth: '150%',
        top: '-100%',
        right: '-100%',
        bottom: '-100%',
        left: '-100%',
        margin: 'auto',
        }}/>
    </div>
    <div style={{ marginTop: '1.5rem', gridColumn: '2 / span 1' }}>
      <span style={{ fontWeight: 'bold', fontSize: '3rem', display: 'block' }}>{row.original.coffeeName}</span>
      <span style={{ fontWeight: '700', fontSize: '1.5rem', display: 'block' }}>{row.original.roaster.name}</span>
    </div>
    <div style={{ gridRow: '2 / span 1', alignSelf: 'end' }}>
      <div>
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem', display: 'block' }}>{row.original.roaster.name} says:</span>
        <span style={{ fontWeight: '500', fontSize: '1rem', display: 'block', gridColumn: '2 / span 1', gridRow: '2 / span 1' }}>{row.original.roasterDescription}</span>
      </div>
      <div style={{ marginTop: '1.25rem' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem', display: 'block' }}>Trade says:</span>
        <span style={{ fontWeight: '500', fontSize: '1rem', display: 'block', gridColumn: '2 / span 1', gridRow: '2 / span 1' }}>{row.original.tradeDescription}</span>
      </div>
    </div>
    <div style={{ gridRow: '2 / span 1', gridColumn: '3 / span 1' }}>
      <span style={{ fontSize: '1.1rem' }}>{row.original.flavors.join(', ')}</span>
    </div>
  </Box>
}
