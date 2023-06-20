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
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import { visuallyHidden } from '@mui/utils'

import TablePaginationActions from '../../../utils/tablePaginationActions'
import Notification from '../../../utils/Notification'





const RoleList = ({ roles, displayForm }) => {

  console.log('role list ->', roles)

  const [ filteredRoles, setFilteredRoles ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState(10)
  const [ sort, setSort ] = useState({ sortItem: 'stationId' , sortOrder: 1 })
  //const [ filterParameters, setFilterParameters ] = useState()
  const order = sort.sortOrder === 1 ? 'asc' : 'desc'
  const orderBy = sort.sortItem

  const roleFilterHandler = () => {
    return setFilteredRoles([])
  }

  const addNewRole = () => {
    displayForm(true)
  }


  const columnHeader = [
    { id: 'RoleName', lable: 'Role Name', minWidth: 30 },
    { id: 'active', lable: 'Active', minWidth: 5 },
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
              <Typography align='center'>ROLES LIST</Typography>
              <IconButton onClick={addNewRole}>
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

  if (!roles){
    return (
      <Notification text={'No role find!'} type={'error'} time={0} />
    )
  }

  return(
    <div>
      <Stack direction={'row'} columnGap={7}>
        {roles.length !== filteredRoles.length ?
          <Box marginTop={2.5}>
            <Notification text={`${filteredRoles.length} of ${roles.length} is filtered.`} time={0} />
          </Box>
          : null
        }
      </Stack>
      <Paper>
        <TableContainer sx={{ height: 250 }}>
          <Table stickyHeader aria-label='sticky table' size='small'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              { roles.map((role) => {
                return(
                  <TableRow hover role='checkbox' tabIndex={-1} key={role.id} onClick={ roleFilterHandler } >
                    <TableCell align='left'>
                      {role.roleName}
                    </TableCell>
                    <TableCell align='center' >
                      <Checkbox checked={role.active} style={{ height: '16px', width: '16px' }} />
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
          count={roles.length}
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

export default RoleList