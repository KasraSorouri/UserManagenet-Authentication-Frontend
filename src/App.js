import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Navigation from './modules/puplic/components/Navigation'
import HomePage from './modules/puplic/components/HomePage'
import SignIn from './modules/usersAndAuthentications/Components/Login'
import SoftwareCompany from './modules/puplic/components/SoftwareCompany'

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <h1>manufacturing App</h1>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<SignIn />} />
        </Routes>
      </Router>
      <footer>
        <SoftwareCompany />
      </footer>
    </div>
  )
}

/*

import { Container } from '@mui/material'

import Navigation from './components/Navigation'
import AboutApp from './components/AboutApp'
import TripsPage from './components/TripsPage'
import StationsPage from './components/StationsPage'
import StationInfo from './components/StationInfo'
import UploadFiles from './components/UploadFiles'

function App() {

  return (
    <div>
      <Container maxWidth='xl'>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<AboutApp />} />
            <Route path='/trips' element={<TripsPage />} />
            <Route path='/stations' element={<StationsPage />} />
            <Route path='/stationInfo/' element={<StationInfo />} />
            <Route path='/uploadFiles' element={<UploadFiles />} />
          </Routes>
        </Router>
      </Container>
    </div>
  )
}
*/
export default App
