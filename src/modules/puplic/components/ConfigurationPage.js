import { Link } from 'react-router-dom'

import {
  Grid,
  Button
} from '@mui/material'

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'


const ConfigurationPage = ({ user }) => {
  const buttonStyle = {
    width: 500,
    height: 150,
    fontSize: '2rem',
    backgroundColor: '#1976d2',
    color: '#FFFFFF',
  }

  const showConfigUser = user && user.roles.includes('Admin')

  return(
    <Grid container justifyContent='space-between' height={700}>
      <Grid item margin={5}>
        { showConfigUser &&
          <Button
            component={Link} to='/userManagement'
            style={buttonStyle}
            startIcon={<ManageAccountsIcon style={{ fontSize: '80px' }}/>}
          >
            User Management
          </Button>
        }
      </Grid>
    </Grid>
  )
}

export default ConfigurationPage