import MainLayout from '../../layout/MainLayout'
import { privateRoutes } from './privateRoutes'
import ProtectRoute from './ProtectRoute'

export const getRoutes = () => {
  privateRoutes.forEach((route) => {
    route.element = <ProtectRoute route={route}>{route.element}</ProtectRoute>
  })

  return {
    path: '/',
    element: <MainLayout />,
    children: privateRoutes,
  }
}
