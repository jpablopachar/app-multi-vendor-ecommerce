import { lazy } from "react"

const Login = lazy(() => import('../../views/auth/Login'))
const Register = lazy(() => import('../../views/auth/Register'))

const publicRoutes = [
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/register',
    component: <Register/>,
  }
]

export default publicRoutes