import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login';
import { AdminDashboard } from './auth/components/admin-dashboard/admin-dashboard';
import { DocenteDashboard } from './auth/components/docente-dashboard/docente-dashboard';
import { AlumnoDashboard } from './auth/components/alumno-dashboard/alumno-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboard },
  { path: 'docente-dashboard', component: DocenteDashboard },
  { path: 'alumno-dashboard', component: AlumnoDashboard },
  { path: '**', redirectTo: 'login' }
];