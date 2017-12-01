import { Input, Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { LyricPiece, Lyric, StudioService } from '../+player';

@Component({
    selector: 'lyric-panel',
    templateUrl: 'lyric-panel.component.html',
    styleUrls: ['lyric-panel.component.css']
})
export class LyricPanelComponent implements OnChanges {
    public lyricRef: Lyric;
    public lyrics: LyricPiece[];
    public error: boolean = false;
    @Input() public song: number;
    private currIndex: number;
    private current: number;
    constructor(
        private studio: StudioService
    ) {
        this.currIndex = -1;
        this.studio.Listen().subscribe((res) => {
            this.current = res.current;
            this.currIndex = this.lyrics.findIndex((e, i) => {
                let ctime = e.time[0] * 60 + e.time[1];
                let ntime = this.lyrics[i + 1] ? (this.lyrics[i + 1].time[0] * 60 + this.lyrics[i + 1].time[1]) :
                (ctime + 5);
                return ctime < this.current && ntime > this.current;
            }) + 1 || -1;
        });
    }

    public currCheck(index: number): boolean {
        return this.currIndex === index;
    }

    public dispCheck(index: number): boolean {
        return this.currIndex > (index - 3) || this.currIndex < (index + 3);
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (
            !!(changes.song.previousValue !== changes.song.currentValue &&
            changes.song.currentValue)
        ) {
            this.studio.Lyric(changes.song.currentValue).then((res) => {
                this.lyricRef = new Lyric(res.lyric);
                this.lyrics = this.lyricRef.Lyric;
            }).catch((err) => {
                console.log(err);
                this.error = true;
            });
        }
    }
}
