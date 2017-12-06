import { Component, OnInit } from '@angular/core';
import { StudioService, StudioRouteService } from '../-player';
import { DialogPopupComponent } from '../../-shared';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'lyric',
    templateUrl: './lyric.component.html',
    styleUrls: ['./lyric.component.css']
})
export class LyricComponent implements OnInit {
    public song: any;
    constructor(
        private studio: StudioService,
        private router: StudioRouteService,
        private dialog: MatDialog
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
