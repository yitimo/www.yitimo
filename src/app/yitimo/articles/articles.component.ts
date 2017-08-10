import { Component, OnInit } from '@angular/core';
import { ArticlesService } from './articles.service';

@Component({
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
    constructor(
        public articles: ArticlesService
    ) {
        //
    }

    public ngOnInit() {
        this.articles.Init();
    }
}
