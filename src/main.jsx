import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { UserProvider } from './Components/ContextApi/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <UserProvider>
    <App />
    </UserProvider>
  </StrictMode>,
)
