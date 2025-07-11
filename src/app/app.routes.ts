import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { TeacherGuard } from './guards/teacher.guard';

import { Home } from './pages/home/home';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';

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

      // TEACHERS
      {
        path: 'list-teachers',
        loadComponent: () =>
          import('./admin/teachers/list-teachers/list-teachers'),
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
      },
      {
        path: 'detail-teacher/:id',
        loadComponent: () =>
          import('./admin/teachers/detail-teacher/detail-teacher'),
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
      },

      // BOTS
      {
        path: 'list-bots',
        loadComponent: () => import('./admin/bots/list-bots/list-bots'),
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
      },
      {
        path: 'detail-bot/:id',
        loadComponent: () => import('./admin/bots/detail-bot/detail-bot'),
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
