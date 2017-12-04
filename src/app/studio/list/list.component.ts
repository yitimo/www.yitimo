import { Component, OnInit } from '@angular/core';
import { StudioService } from '../../-core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    public playList: any[] = [];
    public currId: number = 0;
    constructor(
        private studio: StudioService,
        private router: Router
    ) {
        this.studio.$init.subscribe(() => {
            this.playList = [];
            console.log(this.studio.idList);
            console.log(this.studio.infoList);
            for (let id of this.studio.idList) {
                if (this.studio.infoList[id]) {
                    this.playList.push(this.studio.infoList[id]);
                }
            }
        });
        this.studio.Watch().subscribe((res) => {
            this.currId = res;
            this.playList = [];
            for (let id of this.studio.idList) {
                if (this.studio.infoList[id]) {
                    this.playList.push(this.studio.infoList[id]);
                }
            }
        });
    }

    public ngOnInit() {
        //
    }

    public currCheck(id: number): boolean {
        return this.currId === id;
    }

    public toLyric() {
        let curr = this.router.url;
        this.router.navigateByUrl(this.router.url.replace(/\(studio\:[0-9a-zA-Z\/]+\)/, '(studio:studio/lyric)'));
    }
}
