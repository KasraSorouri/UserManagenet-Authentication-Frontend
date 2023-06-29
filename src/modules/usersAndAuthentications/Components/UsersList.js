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
  Typography,
  IconButton,
  Grid
} from '@mui/material'

import { visuallyHidden } from '@mui/utils'

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'

import TablePaginationActions from '../../../utils/tablePaginationActions'
import Notification from '../../../utils/Notification'

const UserList = ({ users, displayUserForm, selectUser }) => {

  //const [ filteredUsers, setFilteredUsers ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState(10)
  const [ sort, setSort ] = useState({ sortItem: 'stationId' , sortOrder: 1 })
  //const [ filterParameters, setFilterParameters ] = useState()
  const order = sort.sortOrder === 1 ? 'asc' : 'desc'
  const orderBy = sort.sortItem


  const filteredUsers = []

  const showEditUser = (id) => {
    const userData = users.filter((u) => u.id === id )[0]
    console.log('**** user list * userData ->', userData)
    selectUser(userData)
    displayUserForm({ show: true, formType: 'EDIT' })
  }

  const addNewUser = () => {
    const blanklUser = {
      firstName:'',
      lastName:'',
      username:'',
      password:'',
      active: true,
      roles:[]
    }
    selectUser(blanklUser)
    displayUserForm({ show: true, formType: 'ADD' })
  }

  const columnHeader = [
    { id: 'lastName', lable: 'Last Name', minWidth: 10  },
    { id: 'firstName', lable: 'First Name', minWidth: 10 },
    { id: 'username', lable: 'Username', minWidth: 5 },
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
        <TableRow >
          <TableCell colSpan={4} sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }} >
            <Grid container flex flexDirection={'row'} justifyContent={'space-between'} >
              <Typography >USER LIST</Typography>
              <IconButton onClick={addNewUser} style={{ height: '16px', width: '16px', color:'white' }}>
                <PersonAddAlt1Icon  />
              </IconButton>
            </Grid >
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

  if (!users){
    return (
      <Notification text={'No user find!'} type={'error'} time={0} />
    )
  }

  return(
    <div>
      <Stack direction={'row'} columnGap={7}>
        {users.length !== filteredUsers.length ?
          <Box marginTop={2.5}>
            <Notification text={`${filteredUsers.length} of ${users.length} is filtered.`} time={0} />
          </Box>
          : null
        }
      </Stack>
      <Paper>
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label='sticky table' size='small'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              { users.map((user) => {
                return(
                  <TableRow hover role='checkbox' tabIndex={-1} key={user.id} onClick={() => showEditUser(user.id)} >
                    <TableCell align='left' >
                      {user.lastName}
                    </TableCell>
                    <TableCell align='left' >
                      {user.firstName}
                    </TableCell>
                    <TableCell align='left' >
                      {user.username}
                    </TableCell>
                    <TableCell align='center' >
                      <Checkbox checked={user.active} style={{ height: '16px', width: '16px' }}/>
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
          count={users.length}
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

export default UserList