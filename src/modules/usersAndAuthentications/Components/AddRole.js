import { useState } from 'react'

import {
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Paper
} from '@mui/material'

const AddRole = ({ addNewRole, displayForm }) => {

  const [ formValues, setFormValues ] = useState({ roleName:'', active: true })

  const handleChange = (event) => {
    const { name, value, checked } = event.target
    const newValue = name === 'active' ? checked : value

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewRole(formValues)
    setFormValues({
      roleName: '',
      active: true,
    })
  }

  return(
    <Paper elevation={5} sx={{ margin: 2, borderRadius: 3 }}>
      <Typography variant='subtitle1'>Add New Role</Typography>
      <form onSubmit={handleSubmit} >
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-evenly'
          border={'solid'} borderColor={'#1976d2'} borderRadius={3}  margin={1} >
          <TextField
            label='Role'
            name='roleName'
            value={formValues.roleName}
            onChange={handleChange}
            margin='dense'
            variant='outlined'
            size='small'
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formValues.checked}
                defaultChecked={true}
                onChange={handleChange}
                name='active'
                color='primary'
              />
            }
            label="Active"
          />
          <Button type="submit" variant="contained" color="primary">
          Submit
          </Button>
        </Box>
      </form>
      <Box margin={1} >
        <Button fullWidth variant='contained' onClick={() => displayForm(false)} sx={{ marginBottom: 2 }}>close</Button>
      </Box>
    </Paper>
  )
}

export default AddRole