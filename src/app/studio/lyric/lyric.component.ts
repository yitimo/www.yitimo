import { Component, OnInit } from '@angular/core';
import { StudioService } from '../../-core';
import { Router } from '@angular/router';

@Component({
    selector: 'lyric',
    templateUrl: './lyric.component.html',
    styleUrls: ['./lyric.component.css']
})
export class LyricComponent implements OnInit {
    public song: any;
    constructor(
        private studio: StudioService,
        private router: Router
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
    public toList() {
        let curr = this.router.url;
        this.router.navigateByUrl(this.router.url.replace(/\(studio\:[0-9a-zA-Z\/]+\)/, '(studio:studio/list)'));
    }
}
