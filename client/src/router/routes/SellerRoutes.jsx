import { lazy } from "react"

// eslint-disable-next-line react-refresh/only-export-components
const Home = lazy(() => import('../../views/Home'))

export const sellerRoutes = [
  {
    path: '/',
    element: <Home/>,
    ability: ['admin', 'seller']
  }
]