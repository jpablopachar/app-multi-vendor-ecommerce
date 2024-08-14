import { lazy } from "react"

// eslint-disable-next-line react-refresh/only-export-components
const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'))

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    element: <AdminDashboard/>,
    role: 'admin'
  }
]