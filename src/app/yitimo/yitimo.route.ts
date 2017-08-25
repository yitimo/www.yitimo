import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { YitimoComponent } from './yitimo.component';
import { ArticlesComponent } from './articles';
import { DetailComponent } from './detail';

const routes: Routes = [
    {
        path: 'yitimo',
        component: YitimoComponent,
        children: [
            { path: '', component: ArticlesComponent },
            { path: 'articles', component: ArticlesComponent },
            { path: 'detail/:file', component: DetailComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class YitimoRoutingModule {}
