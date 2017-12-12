import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { Putsangto2Component } from './putsangto2.component';
import { DemoComponent } from './demo';

const routes: Routes = [
    {
        path: 'putsangto2',
        component: Putsangto2Component,
        children: [
            { path: '', component: DemoComponent },
            { path: 'demo', component: DemoComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Putsangto2RoutingModule {}
