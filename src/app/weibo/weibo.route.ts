import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { WeiboComponent } from './weibo.component';
import { StatusesComponent } from './statuses/statuses.component';
import { StatusComponent } from './status/status.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    {
        path: '',
        component: WeiboComponent,
        children: [
            { path: 'statuses', component: StatusesComponent },
            { path: 'status', component: StatusComponent },
            { path: 'create', component: CreateComponent, outlet: 'create' },
            { path: '', component: StatusesComponent },
            { path: '**', component: StatusesComponent }
        ]
    },
    { path: '**', component: WeiboComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WeiboRoutingModule {}
