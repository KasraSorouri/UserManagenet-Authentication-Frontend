import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserContextProvider } from './modules/puplic/contexts/userContext'
import { NotificationContextProvider } from './modules/puplic/contexts/NotificationContext'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'

const queryClinet = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <NotificationContextProvider>
    <UserContextProvider>
      <QueryClientProvider client={queryClinet}>
        <App />
      </QueryClientProvider>
    </UserContextProvider>
  </NotificationContextProvider>
)