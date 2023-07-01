import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  Grid,
  Paper,
  Stack,
  LinearProgress
} from '@mui/material'

import { useNotificationSet } from '../../puplic/contexts/NotificationContext'


import userServices from '../services/user'
import roleServices from '../services/role'
import rightServices from '../services/right'

import UserList from './UsersList'
import RoleList from './RoleList'
import RightList from './RightLists'
import UserForm from './UserForm'
import RoleForm from './RoleForm'
import AddRight from './AddRight'

const UserManagement = () => {

  const setNotification = useNotificationSet()

  const [ showUserForm, setShowUserForm ] = useState({ show: false, formType: '' })
  const [ showRoleForm, setShowRoleForm ] = useState({ show: false, formType: '' })
  const [ showNewRight, setShowNewRight ] = useState(false)

  const [ selectedUser, setSelectedUser ] = useState(null)
  const [ selectedRole, setSelectedRole ] = useState(null)

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
      setNotification({ message: 'Right added successfully!', type: 'success', time: 3 })
    },
    onError: () => {
      setNotification({ message: 'Right does not add due to an error!', type: 'error', time: 8 })
    }
  })

  const newUserMutation = useMutation(userServices.createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
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
    <Grid container spacing={2} >
      <Grid item xs={5}>
        <Paper>
          <Grid container spacing={2} >
            <Grid item xs={7}>
              { userResults.isLoading && <LinearProgress sx={{ margin: 1 }}/> }
              { userResults.data && <UserList users={userResults.data} displayUserForm={setShowUserForm} selectUser={setSelectedUser} />}
            </Grid>
            <Grid item xs={5}>
              <Stack direction={'column'}>
                <Paper>
                  { roleResults.isLoading && <LinearProgress sx={{ margin: 1 }}/> }
                  { roleResults.data && <RoleList roles={roleResults.data} displayRoleForm={setShowRoleForm} selectRole={setSelectedRole}/>}
                </Paper>
                <Paper>
                  { rightResults.isLoading && <LinearProgress sx={{ margin: 1 }}/> }
                  { rightResults.data && <RightList rights={rightResults.data} displayForm={setShowNewRight}/>}
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

      </Grid>
      <Grid item xs={7}>
        <Paper>
          { showRoleForm.show && <RoleForm roleData={selectedRole} displayRoleForm={setShowRoleForm} submitHandler={handleRoleFormSubmit} rightList={rightResults.data} formType={showRoleForm.formType}/> }
          { showNewRight && <AddRight addNewRight={createRight} displayForm={setShowNewRight} /> }
          { showUserForm.show && <UserForm userData={selectedUser} formType={showUserForm.formType} submitHandler={handleUserFormSubmit} displayUserForm={setShowUserForm} roleList={roleResults.data.filter((role) => role.active)} /> }
        </Paper>
      </Grid>
    </Grid>

  )
}

export default UserManagement