import { useState } from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  Box,
  TableRow,
  IconButton,
  Typography,
  Grid,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import { visuallyHidden } from '@mui/utils'

import { useNotificationSet } from '../../../contexts/NotificationContext'

const RightList = ({ rights, allRights, displayForm }) => {

  const setNotification = useNotificationSet()

  // Sort Items
  const [ sort, setSort ] = useState({ sortItem: 'right' , sortOrder: 1 })
  const order = sort.sortOrder === 1 ? 'asc' : 'desc'
  const orderBy = sort.sortItem

  const sortedRights = rights.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return -1 * sort.sortOrder
    }
    if (a[orderBy] > b[orderBy]) {
      return 1 * sort.sortOrder
    }
    return 0
  })

  const addNewRight = () => {
    displayForm(true)
  }

  const columnHeader = [
    { id: 'right', lable: 'Right', minWidth: 10 },
    { id: 'relatedModule', lable: 'Module', minWidth: 10 },
  ]

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
    props
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property)
    }
    return (
      <TableHead>
        <TableRow>
          {columnHeader.map((column) => (
            <TableCell
              key={column.id}
              align='center'
              style={{ minWidth: column.minWidth }}
              sx={{ backgroundColor: '#1976d2', color: 'white' }}
              sortDirection={orderBy === column.id ? order : false }
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc' }
                onClick={createSortHandler(column.id)}
              >
                {column.lable}
                {orderBy === column.id ? (
                  <Box  sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order ==='asc'
    setSort({ sortItem: property, sortOrder:isAsc ? -1 : 1 })
  }

  if (!rights){
    return (
      setNotification({ message: 'No Right find!', type: 'info', time: 8 })
    )
  }

  return(
    <div>
      <Paper>
        <Grid container bgcolor={'#1976d2d9'} color={'white'} justifyContent={'space-between'} flexDirection={'row'} >
          <Typography margin={1} >RIGHT LIST</Typography>
          <Typography margin={1} >{rights.length} of {allRights} rights</Typography>
          <div style={{ margin: '10px' }} >
            <IconButton onClick={addNewRight} style={{ height: '16px', width: '16px', color:'white' }}>
              <AddIcon />
            </IconButton>
          </div>
        </Grid>
        <TableContainer sx={{ maxHeight: '250Px' }}>
          <Table stickyHeader aria-label='sticky table' size='small'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              { sortedRights.map((right) => {
                return(
                  <TableRow hover role='checkbox' tabIndex={-1} key={right.id} >
                    <TableCell align='left' >
                      {right.right}
                    </TableCell>
                    <TableCell align='center' >
                      {right.relatedModule}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )

}

export default RightList