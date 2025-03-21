import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import { RouterProvider } from './routes/RouterProvider'
import './index.css'
import 'boxicons';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <RouterProvider />
    </HeroUIProvider>
  </StrictMode>,
)
