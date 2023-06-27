import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  Grid,
  Button,
  Paper,
  Stack } from '@mui/material'

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

import userServices from '../services/user'
import roleServices from '../services/role'
import rightServices from '../services/right'

import UserList from './UsersList'
import RoleList from './RoleList'
import RightList from './RightLists'
import AddRole from './AddRole'
import AddRight from './AddRight'
import AddUser from './AddUser'

const UserManagement = () => {

  const [ showNewUser, setShowNewUser ] = useState(false)
  const [ showNewRole, setShowNewRole ] = useState(false)
  const [ showNewRight, setShowNewRight ] = useState(false)


  const queryClient = useQueryClient()

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
    onSuccess: (newUser) => {
      const users = queryClient.getQueryData('users')
      queryClient.setQueryData('users', users.concat(newUser))
    }
  })


  const userResults = useQuery('users',userServices.getUsers)
  const roleResults = useQuery('roles',roleServices.getRoles)
  const rightResults = useQuery('rights',rightServices.getRights)

  console.log('**** rights  ->', rightResults)


  const createRole = (newRole) => {
    console.log('new role ->', newRole)
    newRoleMutation.mutate(newRole)
  }

  const createRight = (newRight) => {
    console.log('new right ->', newRight)
    newRightMutation.mutate(newRight)
  }

  const createUser = (newUser) => {
    console.log('***** new user ->', newUser)
    newUserMutation.mutate(newUser)
  }

  const closeHandler = () => {
    console.log('close')
  }

  return(
    <Grid container spacing={2} >
      <Grid item xs={5}>
        <Paper>
          <Grid container spacing={2} >
            <Grid item xs={7}>
              { userResults.isLoading && <div>Loading ...</div>}
              { userResults.data && <UserList users={userResults.data} displayForm={setShowNewUser}/>}
            </Grid>
            <Grid item xs={5}>
              <Stack direction={'column'}>
                <Paper>
                  { roleResults.isLoading && <div>Loading ...</div>}
                  { roleResults.data && <RoleList roles={roleResults.data} displayForm={setShowNewRole} />}
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
          <Button onClick={closeHandler} >close</Button>
          <ManageAccountsIcon />
          { showNewRole && <AddRole addNewRole={createRole} displayForm={setShowNewRole} rightList={rightResults.data}/> }
          { showNewRight && <AddRight addNewRight={createRight} displayForm={setShowNewRight} /> }
          { showNewUser && <AddUser addNewUser={createUser} displayForm={setShowNewUser} roleList={roleResults.data.filter((role) => role.active)} /> }

        </Paper>
      </Grid>
    </Grid>

  )
}

export default UserManagement