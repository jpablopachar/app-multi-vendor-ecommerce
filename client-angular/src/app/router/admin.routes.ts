import { Routes } from "@angular/router"
import { protectRouteGuard } from "@app/guards"

export const AdminRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../views/auth/admin-login.component').then(c => c.AdminLoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('../layout/main.component').then(c => c.MainComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../views/admin/admin-dashboard.component').then(c => c.AdminDashboardComponent),
        canActivate: [protectRouteGuard],
        data: { role: 'admin' }
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', }
    ]
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full', },
]