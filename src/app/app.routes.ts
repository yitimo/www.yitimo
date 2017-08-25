import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DevelopComponent } from './develop/develop.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dev', component: DevelopComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];
