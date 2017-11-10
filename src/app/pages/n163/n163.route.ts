import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { N163Component } from './n163.component';
import { SearchComponent } from './search';
import { SongComponent } from './song';
import { InfoComponent } from './info';

const routes: Routes = [
    {
        path: '163',
        component: N163Component,
        children: [
            { path: '', component: SearchComponent },
            { path: 'search', component: SearchComponent },
            { path: 'song', component: SongComponent },
            { path: 'info', component: InfoComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class N163RoutingModule {}
