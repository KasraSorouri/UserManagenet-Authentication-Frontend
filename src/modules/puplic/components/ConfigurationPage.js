import { Link } from 'react-router-dom'

import {
  Grid,
  Button
} from '@mui/material'

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'


const ConfigurationPage = () => {
  const buttonStyle = {
    width: 500,
    height: 150,
    fontSize: '2rem',
    backgroundColor: '#1976d2',
    //borderColor: '#1976d2',
    //borderWidth: '5px',
    //borderStyle: 'solid',
    color: '#FFFFFF',
  }

  return(
    <Grid container justifyContent='space-between'>
      <Grid item margin={5}>
        <Button
          component={Link} to='/userManagement'
          style={buttonStyle}
          startIcon={<ManageAccountsIcon style={{ fontSize: '80px' }}/>}
        >User Management
        </Button>
      </Grid>
    </Grid>
  )
}

export default ConfigurationPage