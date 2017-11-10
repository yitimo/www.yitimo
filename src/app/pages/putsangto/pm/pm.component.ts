import { Component, OnInit } from '@angular/core';
import { PmService } from './pm.service';

@Component({
    selector: 'pm',
    templateUrl: './pm.component.html',
    styleUrls: ['./pm.component.css']
})
export class PmComponent implements OnInit {
    constructor(
        private pm: PmService
    ) {
        //
    }

    public ngOnInit() {
        //
    }
}
