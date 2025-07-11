import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { TeacherGuard } from './guards/teacher.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact'),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about'),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login'),
  },
  {
    path: 'admin',
    component: AdminDashboard,
    children: [
      // PROFILE
      {
        path: 'profile',
        loadComponent: () => import('./admin/profile/profile'),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      // PLAYERS
      {
        path: 'list-players',
        loadComponent: () =>
          import('./admin/players/list-players/list-players'),
        canActivate: [TeacherGuard],
        canLoad: [TeacherGuard],
      },
      {
        path: 'detail-player/:id',
        loadComponent: () =>
          import('./admin/players/detail-player/detail-player'),
        canActivate: [TeacherGuard],
        canLoad: [TeacherGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
