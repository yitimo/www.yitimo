import { Component, OnInit } from '@angular/core';
import { StudioRouteService } from './-player';

@Component({
    templateUrl: './studio.component.html',
    styleUrls: ['./studio.component.css']
})
export class StudioComponent implements OnInit {
    constructor(
        public router: StudioRouteService
    ) {
        //
    }

    public ngOnInit() {
        //
    }
}
