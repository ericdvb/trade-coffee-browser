/* eslint-disable react/jsx-props-no-spreading */
"use client";

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MaterialReactTable } from 'material-react-table'
import { Box, Button } from '@mui/material'
import styles from './tableStyles.module.css'

import CoffeeTableDetailPane from './CoffeeTableDetailPane'

export default function CoffeeTable({ data }) {
  const columns = useMemo(() => [
    {
      id: 'coffeeInfo',
      columns: [
        {
          accessorFn: (row) => row.roaster.imageURI,
          id: 'roasterlogo',
          header: 'roaster',
          size: 50,
          // filterFn: (row, id, filterValue) => row.original.roaster.name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0,
          Cell: ({ renderedCellValue, row }) => (
            <div style={{width: 50, height: 50, position:'relative'}} >
              {
                renderedCellValue
                  ? <Image src={renderedCellValue} alt={`${row.name} logo`} fill />
                  : null
              }
              <span style={{ textIndent: '100%', whiteSpace: 'nowrap', overflow: 'hidden', color: 'transparent' }}>{row.original.roaster.name}</span>
            </div>
          )
        },
        {
          accessorKey: 'coffeeName',
          // filterFn: 'contains',
          header: 'Coffee',
          size: 200,
          Cell: ({ renderedCellValue, row }) => (
            <Box>
              <Link href={`https://drinktrade.com${row.original.detailPageURI}`}>{renderedCellValue}</Link>
            </Box>
          )
        },
        {
          accessorKey: 'coffeeImageURI',
          header: '',
          size: 200,
          enableColumnActions: false,
          Cell: ({ renderedCellValue, row }) => (
            <div style={{width: 100, height: 100, position:'relative'}}>
              <Image src={renderedCellValue} alt={`Picture of ${row.original.coffeeName} package`} width='100' height='100' style={{
                position: 'absolute',
                maxWidth: '150%',
                width: '150%',
                height: '150%',
                top: '-115%',
                right: '-100%',
                bottom: '-100%',
                left: '-100%',
                margin: 'auto',
                }} />
            </div>
          )
        },
        {
          accessorKey: 'coffeeWeight',
          // filterFn: '',
          header: 'Bag Weight',
          size: 25,
        },
        {
          accessorFn: (row) => row.tasteGroup && JSON.parse(row.tasteGroup),
          header: 'Taste Group',
          size: 100,
          filterFn: (row, columnId, filterValue) => row.original.tasteGroup.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0, 
          Cell: ({ renderedCellValue, column }) => (
            <Box>
              <Button variant="text" style={{ textTransform: 'none' }} onClick={(e) => {
                e.preventDefault()
                column.setFilterValue(renderedCellValue.display)
              }}>
                {renderedCellValue.display}
              </Button>
              <span className={styles.hiddenTwo}>{renderedCellValue.display}</span>
            </Box>
          )
        },
        {
          accessorFn: (row) => row.flavors.join(', '),
          // filterFn: 'contains',
          header: 'Flavor Keywords',
          size: 100,
        },
        {
          accessorKey: 'shortDescription',
          // filterFn: 'contains',
          header: 'Summary',
          size: 200,
          Cell: ({ renderedCellValue }) => renderedCellValue,
        },
        {
          accessorFn: (row) => row.price && JSON.parse(row.price).find(price =>
            price.weight.replace(/\s|\./g, '') === row.coffeeWeight)?.priceDiscount,
          // filterFn: 'lessThan',
          header: 'Price',
          size: 100,
          Cell: ({ renderedCellValue }) => (
            <Box>
              {`$${renderedCellValue}`}
            </Box>
          ),
        },


      ]
    }
  ], [])

  return (
      <MaterialReactTable
        columns={columns}
        enableStickyHeader
        data={data}
        initialState={{ density: 'compact' }}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
            '& .Mui-TableBodyCell-DetailPanel': {
              zIndex: 0,
              position: 'relative'
            }
          }
        }}
        muiTablePaperProps={{
          elevation: 0,
          className: 'relative',
        }}
        muiTableHeadCellProps={{
          sx: {
            '& .Mui-TableHeadCell-Content': {
              justifyContent: 'space-between',
            }
          }
        }}
        muiTableBodyRowProps={{
          sx: {
            zIndex: 1,
            position: 'relative',
          }
        }}
        // doesn't work for some reason
        muiTableDetailPanelProps={{
          sx: {
            zIndex: 0,
            position: 'relative',
          }
        }}
        renderDetailPanel={CoffeeTableDetailPane}
      />
  )
}
