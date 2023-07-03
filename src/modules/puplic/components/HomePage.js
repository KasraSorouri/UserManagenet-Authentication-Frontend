import {
  Typography,
  Paper
} from '@mui/material'

const HomePage = () => {

  return(
    <Paper sx={{ height:'700px' }}  >
      <Typography variant='h2'>Home Page</Typography>
      <Typography variant='body1'>This is the Home page of the Application</Typography>
      <Typography variant='body1'>This page is public and anybody can see this page without login</Typography>
      <Typography variant='body1'>For using the application please login</Typography>
    </Paper>
  )
}
export default HomePage