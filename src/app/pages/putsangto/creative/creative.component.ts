import { Component, OnInit } from '@angular/core';
import { CreativeService } from './creative.service';
import { Http, MarkDownService } from '../../../-core';

@Component({
    selector: 'creative',
    templateUrl: './creative.component.html',
    styleUrls: ['./creative.component.css']
})
export class CreativeComponent implements OnInit {
    public content: string;
    constructor(
        private markdown: MarkDownService,
        private http: Http
    ) {
        this.content = '';
    }

    public ngOnInit() {
        this.http.Text('/assets/articles/PUTSANGTO.MD').then((res) => {
            this.content = this.markdown.Html(res);
        }).catch((err) => {
            this.content = this.markdown.Html('# 读取数据出错了');
        });
    }
}
