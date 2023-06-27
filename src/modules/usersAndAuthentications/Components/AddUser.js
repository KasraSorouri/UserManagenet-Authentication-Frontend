import { useState } from 'react'

import {
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Grid,
  Autocomplete
} from '@mui/material'

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const AddUser = ({ addNewUser, displayForm, roleList }) => {

  const initialUser = {
    firstName:'',
    lastName:'',
    username:'',
    password:'',
    active: true,
    roles:[]
  }

  const [ formValues, setFormValues ] = useState(initialUser)

  const handleChange = (event) => {
    const { name, value, checked } = event.target
    const newValue = name === 'active' ? checked : value

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }))
  }

  const handleRoleChange = (event, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      roles: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newUser = { ...formValues, roles: formValues.roles.map(role => role.id) }
    addNewUser(newUser)
    setFormValues(initialUser)
  }

  return(
    <Paper elevation={5} sx={{ margin: 2, borderRadius: 3 }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'
        border={'solid'} borderColor={'#1976d270'} borderRadius={3} bgcolor={'#1976d270'}
      >
        <Typography variant='h6' marginLeft={2}  >Add New User</Typography>
        <Button variant='contained' onClick={() => displayForm(false)}>
          close
        </Button>
      </Box>
      <form onSubmit={handleSubmit} >
        <Box display='flex' border={'solid'} borderColor={'#1976d2'} borderRadius={3}  margin={0} >
          <Grid container flexDirection={'column'}>
            <Grid container flexDirection={'row'} >
              <TextField
                label='First Name'
                name='firstName'
                sx={{ marginLeft: 2 }}
                value={formValues.firstName}
                onChange={handleChange}
                margin='dense'
                variant='outlined'
                size='small'
                required
              />
              <TextField
                label='Last Name'
                name='lastName'
                sx={{ marginLeft: 2 }}
                value={formValues.lastName}
                onChange={handleChange}
                margin='dense'
                variant='outlined'
                size='small'
                required
              />
            </Grid>
            <Grid container flexDirection={'row'} >
              <TextField
                label='Username'
                name='username'
                sx={{ marginLeft: 2 }}
                value={formValues.username}
                onChange={handleChange}
                margin='dense'
                variant='outlined'
                size='small'
                required
              />
              <TextField
                label='Password'
                name='password'
                type='password'
                sx={{ marginLeft: 2 }}
                value={formValues.password}
                onChange={handleChange}
                margin='dense'
                variant='outlined'
                size='small'
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ marginLeft: 2 }}
                    checked={formValues.checked}
                    defaultChecked={true}
                    onChange={handleChange}
                    name='active'
                    color='primary'
                  />
                }
                label='Active'
              />
            </Grid>
            <Grid container margin={2}>
              <Autocomplete
                multiple
                id='roles'
                options={roleList}
                disableCloseOnSelect
                value={formValues.roles}
                onChange={handleRoleChange}
                getOptionLabel={(option) => option.roleName}
                renderOption={(props, option, { selected }) => {
                  console.log('props ->', props, '  ** option ->', option, ' ** selected ->', selected )
                  return (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.roleName}
                    </li>
                  )
                }}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Roles'
                    placeholder='Add Role'
                    size='small'
                    margin='2px'
                    sx={{ maxWidth: '350px', margin: '2' }}
                  />
                )}
              />
            </Grid>
            <Grid>
              <Button type='submit' variant='contained' color='primary' sx={{ marginLeft: 2, marginBottom: 2 }}>
                Submit
              </Button>
            </Grid>
          </Grid>

        </Box>
      </form>

    </Paper>
  )
}

export default AddUser