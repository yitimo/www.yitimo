import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StudioComponent } from './studio.component';
import { ListComponent } from './list';
import { LyricComponent } from './lyric';

const routes: Routes = [
    {
        path: 'studio',
        component: StudioComponent,
        children: [
            { path: 'list', component: ListComponent },
            { path: 'lyric', component: LyricComponent },
        ],
        outlet: 'studio'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudioRoutingModule {}
