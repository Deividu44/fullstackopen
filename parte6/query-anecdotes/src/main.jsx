import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { NotificationContextProvider } from './context/NotificationContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <QueryClientProvider client={queryClient} >
      <App />
    </QueryClientProvider>
  </NotificationContextProvider>
)
