
import {
  Typography,
  Link
} from '@mui/material'

const SoftwareCompany = () => {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/KasraSorouri/'>
       CasraSoft
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default SoftwareCompany