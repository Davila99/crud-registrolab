import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RegistroLab from './components/RegistroLab.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegistroLab />
  </StrictMode>,
)
