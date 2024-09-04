import { Routes } from "@angular/router"

export const AdminRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../views/auth/admin-login.component').then(c => c.AdminLoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../views/admin/admin-dashboard.component').then(c => c.AdminDashboardComponent)
  }
]