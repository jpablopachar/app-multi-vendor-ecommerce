import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import('./App'))

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
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
  </BrowserRouter>
)
