import { useState } from 'react'

import {
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button
} from '@mui/material'

const AddRole = ({ addNewRole, displayForm }) => {

  const [ formValues, setFormValues ] = useState({ roleName:'', active: true })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Perform form submission logic here
    console.log(formValues)
    // Reset form values
    setFormValues({
      roleName: '',
      active: true,
    })
    addNewRole(formValues)
  }

  return(
    <div>
      <Typography variant='subtitle1'>Add New Role</Typography>
      <form onSubmit={handleSubmit} >
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-evenly'
          border={'solid'} borderColor={'#1976d2'} borderRadius={3}  marginBottom={1} >
          <TextField
            label='Role'
            name='roleName'
            value={formValues.role}
            onChange={handleChange}
            margin='dense'
            variant='outlined'
            size='small'
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formValues.agree}
                onChange={handleChange}
                name="active"
                color="primary"
              />
            }
            label="Active"
          />
          <Button type="submit" variant="contained" color="primary">
          Submit
          </Button>
        </Box>
      </form>
      <Button fullWidth variant='contained' onClick={() => displayForm(false)}>close</Button>
    </div>
  )
}

export default AddRole