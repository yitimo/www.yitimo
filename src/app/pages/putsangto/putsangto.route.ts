import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PutsangtoComponent } from './putsangto.component';
import { CreativeComponent } from './creative';
import { PmComponent } from './pm';

const routes: Routes = [
    {
        path: 'putsangto',
        component: PutsangtoComponent,
        children: [
            { path: '', component: CreativeComponent },
            { path: 'creative', component: CreativeComponent },
            { path: 'pm', component: PmComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PutsangtoRoutingModule {}
