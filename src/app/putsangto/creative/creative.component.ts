import { Component, OnInit } from '@angular/core';
import { CreativeService } from './creative.service';

@Component({
    selector: 'creative',
    templateUrl: './creative.component.html',
    styleUrls: ['./creative.component.css']
})
export class CreativeComponent implements OnInit {
    constructor(
        private creative: CreativeService
    ) {
        //
    }

    public ngOnInit() {
        //
    }
}
