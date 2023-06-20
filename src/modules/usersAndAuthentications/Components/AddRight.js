import { useState } from 'react'

import {
  TextField,
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material'

const AddRight = ({ addNewRight, displayForm }) => {

  const [ formValues, setFormValues ] = useState({ right:'', relatedModule: '' })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('** ** add right ->', formValues)
    addNewRight(formValues)
    setFormValues({
      right: '',
      relatedModule: '',
    })
  }

  return(
    <Paper elevation={5} sx={{ margin: 2, borderRadius: 3 }}>
      <Typography variant='subtitle1'>Add New Right</Typography>
      <form onSubmit={handleSubmit} >
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-evenly'
          border={'solid'} borderColor={'#1976d2'} borderRadius={3}  margin={1} >
          <TextField
            label='Right'
            name='right'
            value={formValues.right}
            onChange={handleChange}
            margin='dense'
            variant='outlined'
            size='small'
            required
          />
          <TextField
            label='Related Module'
            name='relatedModule'
            value={formValues.relatedModule}
            onChange={handleChange}
            margin='dense'
            variant='outlined'
            size='small'
            required
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

export default AddRight