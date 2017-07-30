import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DevelopComponent } from './develop/develop.component';

export const ROUTES: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'dev',  component: DevelopComponent },
  { path: 'weibo', loadChildren: './weibo/weibo.module#WeiboModule' },
  { path: 'yitimo', loadChildren: './yitimo/yitimo.module#YitimoModule' },
  { path: '',      redirectTo: 'home', pathMatch: 'full' },
  { path: '**',    redirectTo: 'home', pathMatch: 'full' }
];
