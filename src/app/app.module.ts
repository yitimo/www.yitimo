import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule, DialogPopupComponent } from './-shared';
import { CoreModule } from './-core';
import { ArticleModule } from './article';
import { WeiboModule } from './weibo';

import { HomeComponent } from './home/home.component';
import { DevelopComponent } from './develop/develop.component';

import * as FastClick from 'fastclick';
document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
    document.removeEventListener('DOMContentLoaded');
    console.log('fast click configured');
}, false);
import 'hammerjs';

import '../styles/global.scss';
import '../styles/global.css';
import '../styles/icon.css';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    DevelopComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ArticleModule,
    WeiboModule
  ],
  providers: [
    ENV_PROVIDERS
  ],
  entryComponents: [DialogPopupComponent]
})
export class AppModule {}
