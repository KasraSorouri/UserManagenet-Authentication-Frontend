import { useState } from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TablePagination,
  Box,
  TableRow,
  Stack,
  IconButton,
  Typography,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import { visuallyHidden } from '@mui/utils'

import TablePaginationActions from '../../../utils/tablePaginationActions'
import Notification from '../../../utils/Notification'

const RightList = ({ rights, displayForm }) => {

  console.log('rights list ->', rights)

  const [ filteredRights, setFilteredRights ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState(10)
  const [ sort, setSort ] = useState({ sortItem: 'stationId' , sortOrder: 1 })
  //const [ filterParameters, setFilterParameters ] = useState()
  const order = sort.sortOrder === 1 ? 'asc' : 'desc'
  const orderBy = sort.sortItem

  const rightFilterHandler = () => {
    return setFilteredRights([])
  }

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
        <TableRow style={{ height: '8px', }} >
          <TableCell colSpan={2} sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography align='center'>RIGHT LIST</Typography>
              <IconButton onClick={addNewRight}>
                <AddIcon />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
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
      <Stack direction={'row'} columnGap={7}>
        <Typography variant='h5'>Rights List</Typography>
        {rights.length !== filteredRights.length ?
          <Box marginTop={2.5}>
            <Notification text={`${filteredRights.length} of ${rights.length} is filtered.`} time={0} />
          </Box>
          : null
        }
      </Stack>
      <Paper>
        <TableContainer sx={{ height: 200 }}>
          <Table stickyHeader aria-label='sticky table' size='small'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              { rights.map((right) => {
                return(
                  <TableRow hover role='checkbox' tabIndex={-1} key={right.id} onClick={ rightFilterHandler } >
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          count={rights.length}
          rowsPerPage={rows}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRows(event.target.value)}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </div>
  )

}

export default RightList