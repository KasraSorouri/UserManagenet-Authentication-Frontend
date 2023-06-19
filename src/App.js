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

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <h1>manufacturing App</h1>
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
