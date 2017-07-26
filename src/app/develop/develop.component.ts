import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './develop.component.html',
    styleUrls: ['./develop.component.css']
})
export class DevelopComponent implements OnInit {
    private http;

    public ngOnInit() {
        this.http = require('http') || {};
        console.log(this.http);
    }
}
