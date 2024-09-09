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
  {
    path: 'dashboard/add-product',
    loadComponent: () =>
      import('../views/seller/add-product.component').then(
        (c) => c.AddProductComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  {
    path: 'dashboard/edit-product/productId',
    loadComponent: () =>
      import('../views/seller/edit-product.component').then(
        (c) => c.EditProductComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  {
    path: 'dashboard/products',
    loadComponent: () =>
      import('../views/seller/products.component').then(
        (c) => c.ProductsComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full', },
];