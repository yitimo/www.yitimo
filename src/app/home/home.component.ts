import { Component, OnInit } from '@angular/core';
import { MarkDownService, Http } from '../-core';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public welcome: string;
    constructor(
        private markdown: MarkDownService,
        private http: Http
    ) {}

    public ngOnInit() {
        this.http.Text('/assets/articles/WELCOME.MD').then((res) => {
            this.welcome = this.markdown.Html(res || '');
        }).catch((err) => {
            this.welcome = this.markdown.Html('#抱歉，出了点差错');
        });
    }
}
