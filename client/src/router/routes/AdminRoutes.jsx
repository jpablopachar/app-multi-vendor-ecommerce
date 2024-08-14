import { lazy } from "react"
import Orders from "../../views/admin/Orders"

// eslint-disable-next-line react-refresh/only-export-components
const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'))

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    element: <AdminDashboard/>,
    role: 'admin'
  },
  {
    path: '/admin/dashboard/orders',
    element: <Orders/>,
    role: 'admin'
  }
]