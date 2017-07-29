import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { YitimoComponent } from './yitimo.component';

const routes: Routes = [
    { path: '', component: YitimoComponent },
    { path: '**', component: YitimoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class YitimoRoutingModule {}
