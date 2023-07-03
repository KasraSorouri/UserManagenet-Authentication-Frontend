import { useState, useEffect, forwardRef } from 'react'
import {
  Snackbar,
  Stack
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'

import { useNotificationValue } from '../../../contexts/NotificationContext'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Notification = () => {
  const notification = useNotificationValue()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(true)
  },[notification])

  const autoClose = () => {
    setTimeout(() => setOpen(false), notification.time*1000 )
  }

  notification.time && autoClose()


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  if (!notification.message) {
    return null
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal:'center' }}
        sx={{ marginTop: 7 }}
        open={open}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default Notification