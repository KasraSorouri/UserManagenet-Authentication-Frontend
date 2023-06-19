import { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
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

const UserManagement = () => {

  const [ showNewRole, setShowNewRole ] = useState(false)

  const newRoleMutation = useMutation(roleServices.createRole)
  const userResults = useQuery('users',userServices.getUsers)
  const roleResults = useQuery('roles',roleServices.getRoles)
  const rightResults = useQuery('rights',rightServices.getRights)

  const createRole = (newRole) => {
    console.log('new role ->', newRole)
    newRoleMutation.mutate(newRole)
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
              { userResults.data && <UserList users={userResults.data} />}
            </Grid>
            <Grid item xs={5}>
              <Stack direction={'column'}>
                <Paper>
                  { roleResults.isLoading && <div>Loading ...</div>}
                  { roleResults.data && <RoleList roles={roleResults.data} displayForm={setShowNewRole} />}
                </Paper>
                <Paper>
                  { rightResults.isLoading && <div>Loading ...</div>}
                  { rightResults.data && <RightList rights={rightResults.data} />}
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

      </Grid>
      <Grid item xs={7}>
        <Paper>
          <ManageAccountsIcon />
          { showNewRole && <AddRole addNewRole={createRole} displayForm={setShowNewRole} /> }
          <Button onClick={closeHandler} >close</Button>
        </Paper>
      </Grid>
    </Grid>

  )
}

export default UserManagement