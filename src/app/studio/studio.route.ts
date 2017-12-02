import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StudioComponent } from './studio.component';
import { HomeComponent } from './home';
import { LyricComponent } from './lyric';

const routes: Routes = [
    {
        path: 'studio',
        component: StudioComponent,
        children: [
            { path: '', component: LyricComponent },
            { path: 'home', component: HomeComponent },
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
