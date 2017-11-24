import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { N163Service } from '../n163.service';
import { DialogPopupComponent } from '../../../-shared';

import { Lyric } from '../lyric';

@Component({
    selector: 'info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    public song: any;
    public lyric: any;
    public lyricRef: Lyric;
    constructor(
        private aRoute: ActivatedRoute,
        private n163: N163Service,
        private dialog: MatDialog
    ) {
        //
    }

    public ngOnInit() {
        let id = this.aRoute.snapshot.params['id'];
        this.n163.Info(id).subscribe((res) => {
            this.song = res[0];
        }, (err) => {
            this.dialog.open(DialogPopupComponent, {data: {msg: err}});
        });
        this.n163.Lyric(id).subscribe((res) => {
            this.lyric = res && res.lyric || '';
            this.lyricRef = new Lyric(this.lyric);
        }, (err) => {
            // this.dialog.open(DialogPopupComponent, {data: {msg: err}});
            console.log(err);
        });
    }
}
