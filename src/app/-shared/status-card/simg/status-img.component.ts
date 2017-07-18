import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'simg',
    templateUrl: './status-img.component.html',
    styleUrls: ['./status-img.component.css']
})
export class StatusImgComponent implements OnInit {
    @Input() public thumbnail: any;
    @Input() public bmiddle: any;
    @Input() public original: any;
    @Input() public picIds: any;
    constructor() {
        //
    }

    public ngOnInit() {
        //
    }
}
