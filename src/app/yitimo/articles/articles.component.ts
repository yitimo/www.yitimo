import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.state';

@Component({
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
    constructor(
        public articles: ArticlesService
    ) {
        //
    }
}


// public Markdown(content: string) {
//     return Observable.create((observer) => {
//         observer.next(this.hyperDown.makeHtml(content || ''));
//     });
// }
