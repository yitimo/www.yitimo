import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogPopupComponent } from '../../../-shared';

import { Lyric, Audio, StudioService } from '../../../-core';

@Component({
    selector: 'info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    public song: any;
    public btnShow: boolean = true;
    constructor(
        private aRoute: ActivatedRoute,
        private dialog: MatDialog,
        private studio: StudioService,
        private router: Router
    ) {
        //
    }

    public ngOnInit() {
        let id = parseInt(this.aRoute.snapshot.params['id'], 0) || 0;
        if (!id) {
            this.dialog.open(DialogPopupComponent, {data: {msg: '页面参数错误'}});
            return;
        }
        this.studio.Info(id).then((res) => {
            this.song = res;
        }).catch((err) => {
            this.dialog.open(DialogPopupComponent, {data: {msg: err}});
        });
    }
    public doPlay() {
        return this.song && this.studio.Load(this.song.id).then((res) => {
            this.studio.Play(this.song.id).then(() => {
                this.btnShow = false;
                this.router.navigate([{ outlets: { studio: 'studio' }}]);
            }).catch((err) => {
                this.dialog.open(DialogPopupComponent, {data: {msg: err}});
            });
        }).catch((err) => {
            this.dialog.open(DialogPopupComponent, {data: {msg: err}});
        });
    }
}
