import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserContextProvider } from './modules/puplic/contexts/userContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
)