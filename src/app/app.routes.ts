import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { PublicComponent } from './public';
import { ApiComponent } from './api';
import { NoAuthComponent } from './noauth/noauth.component';
import { OAuthGuard } from './-core';
import { DevelopComponent } from './develop/develop.component';

export const ROUTES: Routes = [
  { path: 'home',  component: HomeComponent, canActivate: [OAuthGuard] },
  { path: 'public',  component: PublicComponent, canActivate: [OAuthGuard] },
  { path: 'api',  component: ApiComponent, canActivate: [OAuthGuard] },
  { path: 'develop',  component: DevelopComponent },
  { path: 'noauth',  component: NoAuthComponent },
  { path: '',      redirectTo: 'home', pathMatch: 'full', canActivate: [OAuthGuard] },
  { path: '**',    redirectTo: 'home', pathMatch: 'full', canActivate: [OAuthGuard] }
];
