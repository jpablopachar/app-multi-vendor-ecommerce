import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import './index.css'

// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import('./App'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense>
      <App />
      <Toaster
        toastOptions={{
          position: 'top-right',
          style: {
            background: '#283046',
            color: 'white',
          },
        }}
      />
    </Suspense>
  </StrictMode>
)
