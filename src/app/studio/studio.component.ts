import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './studio.component.html',
    styleUrls: ['./studio.component.css']
})
export class StudioComponent implements OnInit {
    constructor(
        private router: Router
    ) {
        //
    }

    public ngOnInit() {
        //
    }

    public routeCheck() {
        return !!this.router.url.match(/\(studio\:studio\/[0-9a-zA-Z]+\)/);
    }
}
