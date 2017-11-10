import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.state';

@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    constructor(
        public articles: ArticleService
    ) {
        //
    }
}
