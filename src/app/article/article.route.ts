import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ArticleComponent } from './article.component';
import { ListComponent } from './list';
import { DetailComponent } from './detail';

const routes: Routes = [
    {
        path: 'article',
        component: ArticleComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'list', component: ListComponent },
            { path: 'detail/:file', component: DetailComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule {}
