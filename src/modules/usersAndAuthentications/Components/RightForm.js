import { useState } from 'react'

import {
  TextField,
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material'

const RightForm = ({ addNewRight, displayForm }) => {

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
    addNewRight(formValues)
    setFormValues({
      right: '',
      relatedModule: '',
    })
  }

  return(
    <Paper elevation={5} sx={{ borderRadius: 3, marginBottom: 1  }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'
        border={'solid'} borderColor={'#1976d270'} borderRadius={3}  margin={0}
        bgcolor={'#1976d270'}
      >
        <Typography variant='h6' marginLeft={2}  >Add New Right</Typography>
        <Button variant='contained' onClick={() => displayForm(false)}>
          close
        </Button>
      </Box>
      <form onSubmit={handleSubmit} >
        <Box display='flex' flexDirection='row' alignItems='center'
          border={'solid'} borderColor={'#1976d2'} borderRadius={3} >
          <TextField
            label='Right'
            name='right'
            value={formValues.right}
            onChange={handleChange}
            margin='dense'
            variant='outlined'
            size='small'
            required
            sx={{ marginLeft: 2 }}
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
            sx={{ marginLeft: 2 }}
          />
          <Button type='submit' variant='contained' color='primary' sx={{ marginLeft: 2 }} >
          Submit
          </Button>
        </Box>
      </form>
    </Paper>
  )
}

export default RightForm