import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { UIProvider } from './contexts/UIContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIProvider>
    <AuthProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter> 
    </AuthProvider>
    </UIProvider>
  </StrictMode>,
)
