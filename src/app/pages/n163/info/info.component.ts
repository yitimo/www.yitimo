import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { N163Service } from '../n163.service';
import { DialogPopupComponent } from '../../../-shared';

import { Lyric, Audio } from '../+player';

@Component({
    selector: 'info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    public song: any;
    // private lyricRef: Lyric;
    // private audioRef: Audio;
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
            console.log(err);
        });
        // this.n163.Download(id).subscribe((res) => {
        //     if (!res[0].url) {
        //         this.dialog.open(DialogPopupComponent, {data: {msg: '该歌曲暂无版权'}});
        //     } else {
        //         this.audioRef = new Audio(res[0].url);
        //     }
        // }, (err) => {
        //     console.log(err);
        // });
        // this.n163.Lyric(id).subscribe((res) => {
        //     if (res && res.lyric) {
        //         this.lyricRef = new Lyric(res.lyric);
        //     } else {
        //         this.dialog.open(DialogPopupComponent, {data: {msg: '该歌曲暂无歌词'}});
        //     }
        // }, (err) => {
        //     console.log(err);
        // });
    }

    // public play() {
    //     this.audioRef.play();
    // }
    // public pause() {
    //     this.audioRef.pause();
    // }
    // public abort() {
    //     this.audioRef.abort();
    // }
    // public skip(time: number) {
    //     this.audioRef.skip(time);
    // }
}
