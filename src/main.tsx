import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { Toaster } from 'sonner'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
   <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>
  <Toaster position="top-right" richColors />
      </PersistGate>
  </Provider>
)
