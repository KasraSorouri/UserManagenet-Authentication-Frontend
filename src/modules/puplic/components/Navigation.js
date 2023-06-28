import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Button, Grid, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ConfigIcon from '@mui/icons-material/SettingsSuggest'

import UserProfile from './UserProfile'


const Navigation = ({ user }) => {


  console.log(' ** navi  *user ->', user)

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Button color='inherit' component={Link} to='/'>
              <HomeIcon sx={{ mr: 1 }} />
              <Typography
                variant='h6'
                noWrap
                href='/'
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                HOME
              </Typography>
            </Button>
            <Button color='inherit' component={Link} to='/config'>
              <ConfigIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant='h6'
                noWrap
                href='/'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                CONFIG
              </Typography>
            </Button>
            <Button color='inherit' component={Link} to='/bom'>
              BOM
            </Button>
          </Grid>
          <Grid item>
            { user ? <UserProfile user={user} /> :
              <Button color='inherit' component={Link} to='/login'>
                <Typography
                  variant='h6'
                  noWrap
                  href='/'
                  sx={{
                    mr: 2,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                login
                </Typography>
              </Button>
            }
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
