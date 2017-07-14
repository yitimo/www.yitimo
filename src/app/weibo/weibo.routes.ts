import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { OAuthComponent } from './oauth/oauth.component';
import { RedirectComponent } from './redirect/redirect.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
    { path: 'oauth', component: OAuthComponent },
    { path: 'redirect', component: RedirectComponent },
    { path: 'index', component: IndexComponent },
    { path: '', redirectTo: 'index' },
    { path: '**', redirectTo: 'index' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WeiboRoutingModule {}
