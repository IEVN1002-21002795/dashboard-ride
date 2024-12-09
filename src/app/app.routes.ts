import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AbcComponent } from './abc/abc.component';
import { ApisComponent } from './apis/apis.component';
import { ProcesosComponent } from './procesos/procesos.component';

export const routes: Routes = [
    { path: '', component: LoginComponent }, // Login
    { path: 'home', component: HomeComponent },
    { path: 'admin-users', component: AdminUsersComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'abc', component: AbcComponent },
    { path: 'apis', component: ApisComponent },
    { path: 'procesos', component: ProcesosComponent },
  ];