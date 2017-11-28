import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Audio } from '../+player';

@Component({
    selector: 'player-panel',
    templateUrl: 'player-panel.component.html',
    styleUrls: ['player-panel.component.css']
})
export class PlayerPanelComponent implements OnChanges {
    @Input() public source: string;
    public audioRef;
    constructor() {
        //
    }
    public ngOnChanges(changes: SimpleChanges) {
        if (changes.source && changes.source.previousValue !== changes.source.currentValue) {
            this.audioRef = new Audio(changes.source.currentValue);
        }
    }
}
