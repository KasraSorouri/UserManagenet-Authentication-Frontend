import { useState } from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  //TablePagination,
  Box,
  TableRow,
  IconButton,
  Typography,
  Grid,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import { visuallyHidden } from '@mui/utils'

//import TablePaginationActions from '../../../utils/tablePaginationActions'
import Notification from '../../../utils/Notification'

const RightList = ({ rights, allRights, displayForm }) => {

  //const [ filteredRights, setFilteredRights ] = useState([])
  //const [ page, setPage ] = useState(0)
  //const [ rows, setRows ] = useState(10)
  const [ sort, setSort ] = useState({ sortItem: 'stationId' , sortOrder: 1 })
  //const [ filterParameters, setFilterParameters ] = useState()
  const order = sort.sortOrder === 1 ? 'asc' : 'desc'
  const orderBy = sort.sortItem

  /*
  const rightFilterHandler = () => {
    return setFilteredRights([])
  }
  */

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
      <Notification text={'No Right find!'} type={'error'} time={0} />
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
              { rights.map((right) => {
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