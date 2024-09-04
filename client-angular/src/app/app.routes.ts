import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./router/admin.routes').then((r) => r.AdminRoutes),
  },
  {
    path: 'seller',
    loadComponent: () => import('./layout/main.component').then(c => c.MainComponent),
    loadChildren: () =>
      import('./router/seller.routes').then((r) => r.SellerRoutes),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/auth/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./views/auth/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./views/unauthorized.component').then(
        (c) => c.UnAuthorizedComponent
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./views/page-not-found.component').then(
        (c) => c.PageNotFoundComponent
      ),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full', },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full', },
];