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
  Checkbox,
  Typography,
  IconButton,
  Grid
} from '@mui/material'

import { visuallyHidden } from '@mui/utils'

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import EditIcon from '@mui/icons-material/Edit'

import { useNotificationSet } from '../../../contexts/NotificationContext'

const UserList = ({ users, allUsers,  displayUserForm, selectUser }) => {

  const setNotification = useNotificationSet()

  const [ sort, setSort ] = useState({ sortItem: 'stationId' , sortOrder: 1 })
  const order = sort.sortOrder === 1 ? 'asc' : 'desc'
  const orderBy = sort.sortItem

  const showEditUser = (id) => {
    const userData = users.filter((u) => u.id === id )[0]
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
      setNotification({ message: 'No User find!', type: 'info', time: 8 })
    )
  }

  return(
    <div>
      <Paper>
        <Grid container bgcolor={'#1976d2d9'} color={'white'} justifyContent={'space-between'} flexDirection={'row'} >
          <Typography margin={1} >USER LIST</Typography>
          <Typography margin={1} >{users.length} of {allUsers} users</Typography>

          <div style={{ margin: '10px' }} >
            <IconButton onClick={addNewUser} style={{ height: '16px', width: '16px', color:'white' }}>
              <PersonAddAlt1Icon />
            </IconButton>
          </div>
        </Grid>
        <TableContainer sx={{ maxHeight: '550Px' }}>
          <Table stickyHeader aria-label='sticky table' size='small'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              { users.map((user) => {
                return(
                  <TableRow hover role='checkbox' tabIndex={-1} key={user.id} >
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
                      <Box justifyContent={'space-between'} >
                        <Checkbox checked={user.active} style={{ height: '16px', width: '16px' }}/>
                        <IconButton onClick={() => showEditUser(user.id)} style={{ height: '12px', width: '12px', marginLeft: 25 , color:'#1976d2d9' }}>
                          <EditIcon />
                        </IconButton>
                      </Box>
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

export default UserList