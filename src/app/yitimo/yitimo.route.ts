import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { YitimoComponent } from './yitimo.component';
import { CreateComponent } from './create';

const routes: Routes = [
    {
        path: 'yitimo',
        component: YitimoComponent,
        children: [
            { path: '', component: CreateComponent },
            { path: 'create', component: CreateComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class YitimoRoutingModule {}
