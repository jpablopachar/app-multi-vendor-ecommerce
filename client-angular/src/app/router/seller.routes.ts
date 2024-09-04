import { Routes } from '@angular/router'

export const SellerRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../views/seller/seller-dashboard.component').then(
        (c) => c.SellerDashboardComponent
      ),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full', },
];