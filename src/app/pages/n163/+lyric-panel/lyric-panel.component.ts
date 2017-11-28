import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';
import { LyricPiece } from '../+player';

@Component({
    selector: 'lyric-panel',
    templateUrl: 'lyric-panel.component.html',
    styleUrls: ['lyric-panel.component.css']
})
export class LyricPanelComponent implements OnChanges {
    @Input() public lyrics: LyricPiece[];
    @Input() public duration: number;
    @Input() public current: number;
    private currIndex: number;
    constructor() {
        //
        this.currIndex = 0;
    }

    public currCheck(index: number): boolean {
        return this.currIndex === index;
    }

    public dispCheck(index: number): boolean {
        return this.currIndex > (index - 3) || this.currIndex < (index + 3);
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (
            changes.current &&
            changes.current.previousValue &&
            changes.current.previousValue !== changes.current.currentValue
        ) {
            this.currIndex = this.lyrics.findIndex((e, i) => {
                let ctime = e.time[0] * 60 + e.time[1];
                let ntime = this.lyrics[i + 1] ? (this.lyrics[i + 1].time[0] * 60 + this.lyrics[i + 1].time[1]) :
                (ctime + 5);
                return ctime < changes.current.currentValue && ntime > changes.current.currentValue;
            });
        }
    }
}
