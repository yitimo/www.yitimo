import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { WeiboComponent } from './weibo.component';
import { ApiComponent } from './api/api.component';
import { HomeComponent } from './home';
import { PublicComponent } from './public';

const routes: Routes = [
    {
        path: '',
        component: WeiboComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'public', component: PublicComponent },
            { path: 'api', component: ApiComponent }
        ]
    },
    { path: '**', component: WeiboComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WeiboRoutingModule {}
