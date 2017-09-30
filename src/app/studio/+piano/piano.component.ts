import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tone, StudioService } from '../studio.service';

@Component({
    selector: 'piano',
    templateUrl: './piano.component.html',
    styleUrls: ['./piano.component.scss']
})
export class PianoComponent implements OnInit {
    @Input() public width: string;
    @Output() public press: EventEmitter<Tone> = new EventEmitter<Tone>();
    constructor() {
        //
    }

    public ngOnInit() {
        //
    }
}
