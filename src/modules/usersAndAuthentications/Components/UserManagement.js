import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  Grid,
  Paper,
  Stack } from '@mui/material'

import userServices from '../services/user'
import roleServices from '../services/role'
import rightServices from '../services/right'

import UserList from './UsersList'
import RoleList from './RoleList'
import RightList from './RightLists'
import RoleForm from './RoleForm'
import AddRight from './AddRight'
import UserForm from './UserForm'

const UserManagement = () => {

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
    }
  })

  const newRightMutation = useMutation(rightServices.createRight, {
    onSuccess: (newRight) => {
      const roles = queryClient.getQueryData('rights')
      queryClient.setQueryData('rights', roles.concat(newRight))
    }
  })

  const newUserMutation = useMutation(userServices.createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  // Edit Objects
  const editUserMutation = useMutation(userServices.editUser,{
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const editRoleMutation = useMutation(roleServices.editRole,{
    onSuccess: () => {
      queryClient.invalidateQueries('roles')
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
              { userResults.isLoading && <div>Loading ...</div>}
              { userResults.data && <UserList users={userResults.data} displayUserForm={setShowUserForm} selectUser={setSelectedUser} />}
            </Grid>
            <Grid item xs={5}>
              <Stack direction={'column'}>
                <Paper>
                  { roleResults.isLoading && <div>Loading ...</div>}
                  { roleResults.data && <RoleList roles={roleResults.data} displayRoleForm={setShowRoleForm} selectRole={setSelectedRole}/>}
                </Paper>
                <Paper>
                  { rightResults.isLoading && <div>Loading ...</div>}
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