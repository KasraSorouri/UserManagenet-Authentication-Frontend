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

import { useUserValue, useUserSet  } from './modules/puplic/contexts/userContext'
import { useEffect } from 'react'

function App() {

  const setUser = useUserSet()
  const user = useUserValue()

  useEffect(() => {
    const logedUser = window.localStorage.getItem('Manufacturing_logedUser')
    logedUser && setUser(JSON.parse(logedUser).data)
  },[])

  return (
    <div>
      <Router>
        <Navigation user={user} />
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
