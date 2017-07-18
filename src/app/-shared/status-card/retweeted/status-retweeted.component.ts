import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'retweeted',
    templateUrl: './status-retweeted.component.html',
    styleUrls: ['./status-retweeted.component.css']
})
export class StatusRetweetedComponent implements OnInit {
    @Input() public data: any;
    constructor() {
        //
    }

    public ngOnInit() {
        //
    }
}
