import { Component, OnInit } from '@angular/core';
import { StudioService } from '../../-core';

@Component({
    selector: 'lyric',
    templateUrl: './lyric.component.html',
    styleUrls: ['./lyric.component.css']
})
export class LyricComponent implements OnInit {
    public song: any;
    constructor(
        private studio: StudioService
    ) {
        //
    }

    public ngOnInit() {
        this.studio.Info(this.studio.CurrentId()).then((res) => {
            this.song = res;
        });
        this.studio.Watch().subscribe((id) => {
            this.song = this.studio.infoList[id];
        });
    }
}
