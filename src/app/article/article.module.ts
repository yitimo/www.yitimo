import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../-shared';
import { ArticleRoutingModule } from './article.route';
import { ArticleComponent } from './article.component';
import { ListComponent } from './list';
import { ArticleService } from './article.state';
import { DetailComponent } from './detail';

@NgModule({
    declarations: [ArticleComponent, ListComponent, DetailComponent],
    imports: [ CommonModule, SharedModule, ArticleRoutingModule ],
    exports: [],
    providers: [ArticleService],
})
export class ArticleModule {}
