import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'environments/environment';
// 根模块
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { NotFountRoutingModule } from './404';
import { AppRoutingModule } from './app.routes';
// 全局模块
import { SharedModule, DialogPopupComponent } from './-shared';
import { CoreModule } from './-core';
// 功能模块
import { ArticleModule } from './pages/article';
import { WeiboModule } from './pages/weibo';
import { PutsangtoModule } from './pages/putsangto';
import { StudioModule as FactoryModule } from './pages/studio';
import { N163Module } from './pages/n163';
// 第二路由
import { StudioModule } from './studio';

import 'hammerjs';

import '../styles/global.scss';
import '../styles/global.css';
import '../styles/icon.css';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ArticleModule,
    WeiboModule,
    PutsangtoModule,
    FactoryModule,
    N163Module,
    StudioModule,
    NotFountRoutingModule
  ],
  providers: [
    environment.ENV_PROVIDERS
  ],
  entryComponents: []
})
export class AppModule {}
