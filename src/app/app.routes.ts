import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { PublicComponent } from './public';
import { ApiComponent } from './api';

export const ROUTES: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'public',  component: PublicComponent },
  { path: 'api',  component: ApiComponent },
  { path: '',      component: HomeComponent },
  { path: '**',    component: HomeComponent },
];
