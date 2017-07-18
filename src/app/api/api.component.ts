import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
    constructor(
        private api: ApiService
    ) {}

    public ngOnInit() {
        //
    }
}
