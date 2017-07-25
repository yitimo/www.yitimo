import { Component, OnInit } from '@angular/core';
import { ytmFly } from '../-shared';

@Component({
    templateUrl: './develop.component.html',
    styleUrls: ['./develop.component.css'],
    animations: [ytmFly]
})
export class DevelopComponent implements OnInit {
    public topTip: boolean;
    public bottomTip: boolean;
    private http;
    constructor() {
        this.topTip = false;
        this.bottomTip = false;
    }

    public ngOnInit() {
        this.http = require('http') || {};
        console.log(this.http);
    }

    public pulling(e: {action: string, scroll: number}) {
        if (e.action === 'up' && e.scroll < 0) {
            this.topTip = false;
            return;
        }
        if (e.action === 'down' && e.scroll > 0) {
            this.bottomTip = false;
            return;
        }
    }
    public pulled(e) {
        if (e === 'up') {
            this.topTip = true;
        } else if (e === 'down') {
            this.bottomTip = true;
        }
    }
}
