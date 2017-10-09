import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ENV_PROVIDERS } from './environment';
// 根模块
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { DefaultModule } from './default';
import { AppRoutingModule } from './app.routes';
// 全局模块
import { SharedModule, DialogPopupComponent } from './-shared';
import { CoreModule } from './-core';
// 功能模块
import { ArticleModule } from './article';
import { WeiboModule } from './weibo';
import { PutsangtoModule } from './putsangto';
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
    StudioModule,
    DefaultModule
  ],
  providers: [
    ENV_PROVIDERS
  ],
  entryComponents: [DialogPopupComponent]
})
export class AppModule {}
