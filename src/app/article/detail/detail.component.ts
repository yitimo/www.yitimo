import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.state';
import { Http } from '../../-core';
// tslint:disable-next-line:no-var-requires
const HyperDown = require('hyperdown');

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    public content: string;
    private hyperDown: any;
    constructor(
        private aRoute: ActivatedRoute,
        private articles: ArticleService,
        private http: Http
    ) {
        this.hyperDown = new HyperDown();
    }

    public ngOnInit() {
        this.http.Text(`/assets/articles/${this.aRoute.snapshot.params['file']}`).then((res) => {
            this.content = this.hyperDown.makeHtml(res || '');
        }).catch((err) => {
            console.log(err);
        });
    }
}
