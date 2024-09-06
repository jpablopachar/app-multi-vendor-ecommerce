import { Routes } from '@angular/router'
import { protectRouteGuard } from '@app/guards'

export const SellerRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../views/seller/seller-dashboard.component').then(
        (c) => c.SellerDashboardComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full', },
];