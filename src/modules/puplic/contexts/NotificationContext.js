import { useState, createContext, useContext } from 'react'

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState({ message: '', type: 'info', time: 0 })

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const NotificationValueAndSet = useContext(NotificationContext)
  return NotificationValueAndSet[0]
}

export const useNotificationSet = () => {
  const NotificationValueAndSet = useContext(NotificationContext)
  return NotificationValueAndSet[1]
}

export default NotificationContext