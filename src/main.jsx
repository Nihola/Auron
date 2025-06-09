import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Router } from './routers/Router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={Router}/>
  </StrictMode>,
)
