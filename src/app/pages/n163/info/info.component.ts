import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogPopupComponent } from '../../../-shared';

import { Lyric, Audio, StudioService, StudioRouteService } from '../../../studio';

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
        private router: StudioRouteService
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
        if (!this.song) {
            return;
        }
        if (!this.studio.srcList[this.song.id] || this.studio.CurrentId() !== this.song.id) {
            this.studio.Load(this.song.id).then((res) => {
                this.studio.Play(this.song.id).then(() => {
                    this.router.lyric();
                }).catch((err) => {
                    this.dialog.open(DialogPopupComponent, {data: {msg: err}});
                });
            }).catch((err) => {
                this.dialog.open(DialogPopupComponent, {data: {msg: err}});
            });
        } else {
            this.router.lyric();
        }
    }
    public doAdd() {
        if (!this.song) {
            return;
        }
        if (this.studio.infoList[this.song.id]) {
            this.router.root();
            return;
        }
        this.studio.Add(this.song.id).then(() => {
            this.router.root();
        }).catch((err) => {
            this.dialog.open(DialogPopupComponent, {data: {msg: err}});
        });
    }
}
