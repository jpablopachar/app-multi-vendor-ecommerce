import { Routes } from "@angular/router"

export const SellerRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('../views/seller/seller-dashboard.component').then(c => c.SellerDashboardComponent)
  }
]