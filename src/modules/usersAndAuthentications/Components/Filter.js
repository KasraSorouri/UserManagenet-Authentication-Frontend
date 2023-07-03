import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'


const Filter = ({ HandleFilter }) => {

  const initialValue = {
    name:'',
    username: '',
    role: '',
    right: '',
    userActive: 'All',
    roleActive: 'All'
  }

  const [ formValues, setFormValues ] = useState(initialValue)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues(() => ({
      ...formValues,
      [name]: value,
    }))
  }

  useEffect (() => {
    HandleFilter(formValues)
  },[formValues])

  return(
    <Grid container bgcolor={'#1976d270'} sx={{ borderTopLeftRadius: 3, borderTopRightRadius: 3 }}>
      <Grid item xs={10} >
        <Stack direction={'row'}>
          <Typography variant='body1' marginLeft={1}  marginTop={2} >filter </Typography>
          <TextField
            label='Name'
            name='name'
            value={formValues.name}
            onChange={handleChange}
            margin='dense'
            variant='outlined'
            size='small'
            sx={{ marginLeft: 1 }}
          />
          <TextField
            label='Username'
            name='username'
            value={formValues.username}
            onChange={handleChange}
            margin='dense'
            variant='outlined'
            size='small'
            sx={{ marginLeft: 1 }}
          />
          <Box alignContent={'center'} marginLeft={1}>
            <Stack direction={'column'}>
              <Typography marginLeft={1} marginTop={1} variant='caption' >Active Users</Typography>
              <ToggleButtonGroup
                value={formValues.userActive}
                exclusive
                onChange={handleChange}
                aria-label='Platform'
                size='small'
                sx={{ color: 'white' }}
              >
                <ToggleButton name='userActive' value='all' sx={{ maxHeight: 5, fontSize: 8 }} style={ formValues.userActive === 'all' ? { color:'white' } : { color:'black' }} >all</ToggleButton>
                <ToggleButton name='userActive' value='yes' sx={{ maxHeight: 5, fontSize: 8 }} style={ formValues.userActive === 'yes' ? { color:'white' } : { color:'black' }} >yes</ToggleButton>
                <ToggleButton name='userActive' value='no' sx={{ maxHeight: 5, fontSize: 8 }} style={ formValues.userActive === 'no' ? { color:'white' } : { color:'black' }} >no</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Box>
        </Stack>
        <Stack direction={'row'}>
          <TextField
            label='Role'
            name='role'
            value={formValues.role}
            onChange={handleChange}
            margin='dense'
            variant='outlined'
            size='small'
            sx={{ marginLeft: 6 }}
          />
          <TextField
            label='Right'
            name='right'
            value={formValues.right}
            onChange={handleChange}
            margin='dense'
            variant='outlined'
            size='small'
            sx={{ marginLeft: 1 }}
          />
          <Box alignContent={'center'} marginLeft={1}>
            <Stack direction={'column'}>
              <Typography marginLeft={1} marginTop={1} variant='caption' >Active Roles</Typography>
              <ToggleButtonGroup
                value={formValues.roleActive}
                exclusive
                onChange={handleChange}
                aria-label='Platform'
                size='small'
                sx={{ color: 'white' }}
              >
                <ToggleButton name='roleActive' value='all' sx={{ maxHeight: 5, fontSize: 8 }} style={ formValues.roleActive === 'all' ? { color:'white' } : { color:'black' }} >all</ToggleButton>
                <ToggleButton name='roleActive' value='yes' sx={{ maxHeight: 5, fontSize: 8 }} style={ formValues.roleActive === 'yes' ? { color:'white' } : { color:'black' }} >yes</ToggleButton>
                <ToggleButton name='roleActive' value='no' sx={{ maxHeight: 5, fontSize: 8 }} style={ formValues.roleActive === 'no' ? { color:'white' } : { color:'black' }} >no</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Button variant='contained' size='small'onClick={() => setFormValues(initialValue)} sx={{ marginTop: 1.5, marginLeft: 5 }}>reset</Button>
      </Grid>
    </Grid>

  )
}

export default Filter