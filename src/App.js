import { useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Navigation from './modules/puplic/components/Navigation'
import HomePage from './modules/puplic/components/HomePage'
import SignIn from './modules/usersAndAuthentications/Components/Login'
import SoftwareCompany from './modules/puplic/components/SoftwareCompany'
import ConfigurationPage from './modules/puplic/components/ConfigurationPage'
import UserManagement from './modules/usersAndAuthentications/Components/UserManagement'
import Notification from './modules/puplic/components/Notification'

import { useUserValue, useUserSet  } from './modules/puplic/contexts/userContext'
import { useNotificationValue } from './modules/puplic/contexts/NotificationContext'

function App() {

  const setUser = useUserSet()
  const user = useUserValue()
  const notification = useNotificationValue()


  console.log(' app notification ->', notification)

  useEffect(() => {
    const logedUser = window.localStorage.getItem('Manufacturing_logedUser')
    logedUser && setUser(JSON.parse(logedUser).data)
  },[])

  return (
    <div>
      <Router>
        <Navigation user={user} />
        <Notification notification={notification} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/Config' element={<ConfigurationPage />} />
          <Route path='/userManagement'element={<UserManagement />} />
        </Routes>
      </Router>
      <footer>
        <SoftwareCompany />
      </footer>
    </div>
  )
}

export default App
