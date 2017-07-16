import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ytb-card',
    templateUrl: './ytb-card.component.html',
    styleUrls: ['./ytb-card.component.css']
})
export class YTBCardComponent implements OnInit {
    @Input() public data;
    constructor() {
        //
    }

    public ngOnInit() {
        //
    }
}
