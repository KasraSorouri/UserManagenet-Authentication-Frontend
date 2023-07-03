import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  Grid,
  Paper,
  Stack,
  LinearProgress,
  Box,
  Typography,
  Button,
} from '@mui/material'

import { useNotificationSet } from '../../../contexts/NotificationContext'

import userServices from '../services/user'
import roleServices from '../services/role'
import rightServices from '../services/right'

import UserList from './UsersList'
import RoleList from './RoleList'
import RightList from './RightLists'
import UserForm from './UserForm'
import RoleForm from './RoleForm'
import RightForm from './RightForm'
import Filter from './Filter'

const UserManagement = () => {

  const setNotification = useNotificationSet()
  const navigate = useNavigate()

  const [ showUserForm, setShowUserForm ] = useState({ show: false, formType: '' })
  const [ showRoleForm, setShowRoleForm ] = useState({ show: false, formType: '' })
  const [ showNewRight, setShowNewRight ] = useState(false)

  const [ selectedUser, setSelectedUser ] = useState(null)
  const [ selectedRole, setSelectedRole ] = useState(null)

  const [ filterParameter, setFilterParameter ] = useState({ name:'', username: '', role:'', right:'', userActive: 'All', roleActive: 'All' })

  // Query implementation
  const queryClient = useQueryClient()

  // Add New Opjects
  const newRoleMutation = useMutation(roleServices.createRole, {
    onSuccess: (newRole) => {
      const roles = queryClient.getQueryData('roles')
      queryClient.setQueryData('roles', roles.concat(newRole))
      setNotification({ message: 'Role added successfully!', type: 'success', time: 3 })
    },
    onError: () => {
      setNotification({ message: 'Role does not add due to an error!', type: 'error', time: 8 })
    }
  })

  const newRightMutation = useMutation(rightServices.createRight, {
    onSuccess: (newRight) => {
      const roles = queryClient.getQueryData('rights')
      queryClient.setQueryData('rights', roles.concat(newRight))
      setSelectedRole({ roleName:'', active: true, rights:[] })
      setNotification({ message: 'Right added successfully!', type: 'success', time: 3 })
    },
    onError: () => {
      setNotification({ message: 'Right does not add due to an error!', type: 'error', time: 8 })
    }
  })

  const newUserMutation = useMutation(userServices.createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      setSelectedUser({
        firstName:'',
        lastName:'',
        username:'',
        password:'',
        active: true,
        roles:[]
      })
      setNotification({ message: 'User added successfully!', type: 'success', time: 3 })
    },
    onError: () => {
      setNotification({ message: 'User does not add due to an error!', type: 'error', time: 8 })
    }
  })

  // Edit Objects
  const editUserMutation = useMutation(userServices.editUser,{
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      setNotification({ message: 'User updated successfully!', type: 'success', time: 3 })
    },
    onError: () => {
      setNotification({ message: 'User does not update due to an error!', type: 'error', time: 8 })
    }
  })

  const editRoleMutation = useMutation(roleServices.editRole,{
    onSuccess: () => {
      queryClient.invalidateQueries('roles')
      setNotification({ message: 'Role updated successfully!', type: 'success', time: 3 })
    },
    onError: () => {
      setNotification({ message: 'Role does not update due to an error!', type: 'error', time: 8 })
    }
  })

  // Get Objects
  const userResults = useQuery('users',userServices.getUsers, { refetchOnWindowFocus: false })
  const roleResults = useQuery('roles',roleServices.getRoles, { refetchOnWindowFocus: false })
  const rightResults = useQuery('rights',rightServices.getRights, { refetchOnWindowFocus: false })

  // filter Objects
  const handleFilter = (filterParams) => {
    setFilterParameter(filterParams)
  }

  let filteredRights = rightResults.data
  let filteredRoles = roleResults.data
  let filteredUsers = userResults.data

  switch (filterParameter.userActive) {
  case 'yes':
    filteredUsers = filteredUsers.filter( user => user.active === true )
    break
  case 'no':
    filteredUsers = filteredUsers.filter( user => user.active === false )
    break
  case 'all':
    filteredUsers
    break
  default:
    filteredUsers
  }

  switch (filterParameter.roleActive) {
  case 'yes':
    filteredRoles = filteredRoles.filter( role => role.active === true )
    break
  case 'no':
    filteredRoles = filteredRoles.filter( role => role.active === false )
    break
  case 'all':
    filteredRoles
    break
  default:
    filteredRoles
  }

  if ( filterParameter.right ) {
    filteredRights = filteredRights.filter(right => right.right.toLowerCase().includes(filterParameter.right.toLowerCase()))
    filteredRoles = filteredRoles.filter(role => filteredRights.some(right => role.rights.some(roleRight => roleRight.right === right.right)))
    filteredUsers = filteredUsers.filter(user => filteredRoles.some(role => user.roles.some(userRole => userRole.roleName === role.roleName)))
  } else {
    filteredRights = rightResults.data
  }
  if ( filterParameter.role  || filterParameter.roleActive !=='All' ) {
    filteredRoles = filteredRoles.filter(role => role.roleName.toLowerCase().includes(filterParameter.role.toLowerCase()) )
    filteredUsers = filteredUsers.filter(user => filteredRoles.some(role => user.roles.some(userRole => userRole.roleName === role.roleName)))
  }
  if ( filterParameter.name ) {
    filteredUsers = filteredUsers.filter(user => user.firstName.toLowerCase().includes(filterParameter.name) ||
      user.lastName.toLowerCase().includes(filterParameter.name))
  }
  if ( filterParameter.username ) {
    filteredUsers = filteredUsers.filter(user => user.username.toLowerCase().includes(filterParameter.username.toLowerCase()))
  }

  // Role form Submit
  const handleRoleFormSubmit = (newRoleData) => {
    if (showRoleForm.formType === 'ADD') {
      newRoleMutation.mutate(newRoleData)
    }

    if (showRoleForm.formType === 'EDIT') {
      editRoleMutation.mutate(newRoleData)
    }
  }

  // Right Form Submit
  const createRight = (newRight) => {
    newRightMutation.mutate(newRight)
  }

  // User Form Submit
  const handleUserFormSubmit = (newUserData) => {
    if (showUserForm.formType === 'ADD') {
      newUserMutation.mutate(newUserData)
    }

    if (showUserForm.formType === 'EDIT') {
      editUserMutation.mutate(newUserData)
    }
  }

  return(
    <Paper sx={{ marginTop: 1, border:'solid',  borderRadius: 2, borderColor:'#1976d270' }} bgcolor={'#1976d270'} >
      <Box display='flex' justifyContent='space-between' alignItems='center'
        borderRadius={2}  bgcolor={'#1976d270'}
      >
        <Grid container bgcolor={'#1976d2d9'} color={'white'} justifyContent={'space-between'} flexDirection={'row'} >
          <Typography margin={1} >USER CONFIGURATION</Typography>
          <Button variant='outLined' onClick={() => navigate('/config')} size='small' >
          close
          </Button>
        </Grid>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper >
            <Filter HandleFilter={handleFilter}/>
            <Grid container spacing={1} height={'600px'}>
              <Grid item xs={7}>
                { userResults.isLoading && <LinearProgress sx={{ margin: 1 }}/> }
                { userResults.data && <UserList users={filteredUsers} allUsers={userResults.data.length} displayUserForm={setShowUserForm} selectUser={setSelectedUser} />}
              </Grid>
              <Grid item xs={5}>
                <Stack direction={'column'}>
                  <Box height={'50%'} maxHeight={'300px'}>
                    { roleResults.isLoading && <LinearProgress sx={{ margin: 1 }}/> }
                    { roleResults.data && <RoleList roles={filteredRoles} allRoles={roleResults.data.length} displayRoleForm={setShowRoleForm} selectRole={setSelectedRole}/>}
                  </Box>
                  <Box height={'50%'} maxHeight={'300px'} marginTop={1}>
                    { rightResults.isLoading && <LinearProgress sx={{ margin: 1 }}/> }
                    { rightResults.data && <RightList rights={filteredRights} allRights={rightResults.data.length} displayForm={setShowNewRight}/>}
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} >
          { showRoleForm.show && <RoleForm roleData={selectedRole} displayRoleForm={setShowRoleForm} submitHandler={handleRoleFormSubmit} rightList={rightResults.data} formType={showRoleForm.formType}/> }
          { showNewRight && <RightForm addNewRight={createRight} displayForm={setShowNewRight} /> }
          { showUserForm.show && <UserForm userData={selectedUser} formType={showUserForm.formType} submitHandler={handleUserFormSubmit} displayUserForm={setShowUserForm} roleList={roleResults.data.filter((role) => role.active)} /> }
        </Grid>
      </Grid>
    </Paper>
  )
}

export default UserManagement