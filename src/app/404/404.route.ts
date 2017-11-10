import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './404.component';

const routes: Routes = [
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    declarations: [NotFoundComponent],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotFountRoutingModule {}
