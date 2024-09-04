import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    children: [
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
        path: 'admin',
        loadChildren: () =>
          import('./router/admin.routes').then((r) => r.AdminRoutes),
      },
      {
        path: 'seller',
        loadChildren: () =>
          import('./router/seller.routes').then((r) => r.SellerRoutes),
      },
      {
        path: 'unauthorized',
        loadComponent: () =>
          import('./views/unauthorized.component').then(
            (c) => c.UnAuthorizedComponent
          ),
      },
    ],
  },
];
