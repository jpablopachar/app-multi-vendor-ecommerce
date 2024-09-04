import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./views/auth/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./views/auth/register.component').then(c => c.RegisterComponent)
      },
      /* {
        path: 'admin/login',
        loadChildren: () => import('./views/auth/admin-login.component').then(c => c.AdminLoginComponent)
      }, */
      {
        path: 'unauthorized',
        loadComponent: () => import('./views/unauthorized.component').then(c => c.UnAuthorizedComponent)
      }
    ]
  }
];
