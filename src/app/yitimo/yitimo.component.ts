import { Component, OnInit, OnDestroy } from '@angular/core';
import { YitimoService } from './yitimo.service';

@Component({
    templateUrl: './yitimo.component.html',
    styleUrls: ['./yitimo.component.css']
})
export class YitimoComponent implements OnInit, OnDestroy {
    public content: string;
    public disp;
    private interval;
    constructor(
        private yitimo: YitimoService
    ) {
        this.disp = '';
    }

    public ngOnInit() {
        this.interval = window.setInterval(() => {
            this.disp = this.yitimo.Markdown(this.content);
        }, 3000);
    }
    public ngOnDestroy() {
        window.clearInterval(this.interval);
    }
}
