import { useEffect, useState } from 'react'

import {
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Autocomplete,
  Grid
} from '@mui/material'

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const RoleForm = ({ formType, roleData, submitHandler, displayRoleForm, rightList }) => {

  console.log(' ** Role form *** Role data ->', roleData)
  console.log(' ** Role form *** right list ->', rightList)
  console.log(' ** Role form *** formType ->', formType)


  const formTitle = formType === 'ADD' ? 'Add New Role' : 'Edit Role'
  const submitTitle = formType === 'ADD' ? 'Add Role' : 'Update Role'

  const [ formValues, setFormValues ] = useState(roleData)

  console.log(' ** Role form *** formValues ->', formValues)

  useEffect(() => {
    setFormValues(roleData)
  },[roleData])


  const handleChange = (event) => {
    const { name, value, checked } = event.target
    const newValue = name === 'active' ? checked : value

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }))
  }

  const handleRightChange = (event, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      rights: value,
    }))
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    const newRole = { ...formValues, rights: formValues.rights.map(right => right.id) }
    submitHandler(newRole)
    formType === 'ADD' && setFormValues(roleData)
  }

  return(
    <Paper elevation={5} sx={{ margin: 2, borderRadius: 3 }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'
        border={'solid'} borderColor={'#1976d270'} borderRadius={3}  margin={0}
        bgcolor={'#1976d270'}
      >
        <Typography variant='h6' marginLeft={2}  >{formTitle}</Typography>
        <Button variant='contained' onClick={() => displayRoleForm({ show: false })}>
          close
        </Button>
      </Box>
      <form onSubmit={handleSubmit} >
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-evenly'
          border={'solid'} borderColor={'#1976d2'} borderRadius={3}
        >
          <Grid container flexDirection={'column'}>
            <Grid container flexDirection={'row'} justifyContent={'space-between'} >
              <Grid>
                <TextField
                  label='Role'
                  name='roleName'
                  value={formValues.roleName}
                  onChange={handleChange}
                  margin='dense'
                  variant='outlined'
                  size='small'
                  required
                  sx={{ marginLeft: 2 }}
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
              <Grid>
                <Autocomplete
                  sx={{ marginLeft: 2 , marginTop: 1 }}
                  multiple
                  id='rights'
                  options={rightList}
                  disableCloseOnSelect
                  value={formValues.rights}
                  onChange={handleRightChange}
                  getOptionLabel={(option) => option.right}
                  renderOption={(props, option, { selected }) => {
                    return (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.right}
                      </li>
                    )
                  }}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Rights'
                      placeholder='Add right'
                      size='small'
                      sx={{ maxWidth: '250px' }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Button type='submit' variant='contained' color='primary' sx={{ marginLeft: 2, marginBottom: 2 }}>
                {submitTitle}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Paper>
  )
}

export default RoleForm