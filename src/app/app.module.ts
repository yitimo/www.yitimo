import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';

import * as FastClick from 'fastclick';
document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
    document.removeEventListener('DOMContentLoaded');
    console.log('fast click configured');
}, false);

import '../styles/global.scss';
import '../styles/global.css';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  providers: [
    ENV_PROVIDERS
  ]
})
export class AppModule {}
