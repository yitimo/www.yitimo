import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StudioComponent } from './studio.component';
import { EditComponent } from './edit';
import { ListComponent } from './list';

const routes: Routes = [
    {
        path: 'studio',
        component: StudioComponent,
        children: [
            { path: '', component: EditComponent },
            { path: 'edit', component: EditComponent },
            { path: 'list', component: ListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudioRoutingModule {}
