import { Routes } from '@angular/router';
import { HomeComponent } from './home';

export const ROUTES: Routes = [
  { path: 'weibo', loadChildren: './weibo/weibo.module.ts#WeiboModule'},
  { path: 'home',  component: HomeComponent },
  { path: '',      component: HomeComponent },
  { path: '**',    component: HomeComponent },
];
