import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
   <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>
  <Toaster position="top-right" richColors />
  </Provider>
)
