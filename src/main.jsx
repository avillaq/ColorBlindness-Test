import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from './routes/RouterProvider'
import './index.css'
import 'boxicons';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider />
  </StrictMode>,
)
