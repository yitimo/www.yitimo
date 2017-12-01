import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { N163Service } from '../n163.service';
import { DialogPopupComponent } from '../../../-shared';

import { Lyric, Audio, StudioService } from '../+player';

@Component({
    selector: 'info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    public song: any;
    constructor(
        private aRoute: ActivatedRoute,
        private dialog: MatDialog,
        private studio: StudioService
    ) {
        //
    }

    public ngOnInit() {
        let id = parseInt(this.aRoute.snapshot.params['id'], 0) || 0;
        if (!id) {
            this.dialog.open(DialogPopupComponent, {data: {msg: '页面参数错误'}});
            return;
        }
        this.studio.Inited().then(() => {
            this.studio.Add(id).then((res) => {
                console.log(res);
                this.song = res;
            }).catch((err) => {
                this.dialog.open(DialogPopupComponent, {data: {msg: err}});
            });
        });
    }
}
