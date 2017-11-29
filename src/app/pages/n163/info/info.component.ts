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
    public lyricStr: string;
    public audioStr: string;
    public current: number;
    constructor(
        private aRoute: ActivatedRoute,
        private n163: N163Service,
        private dialog: MatDialog
    ) {
        //
    }

    public ngOnInit() {
        // let id = this.aRoute.snapshot.params['id'];
        // this.n163.Info(id).subscribe((res) => {
        //     this.song = res[0];
        // }, (err) => {
        //     this.dialog.open(DialogPopupComponent, {data: {msg: err}});
        // });
        // this.n163.Lyric(id).subscribe((res) => {
        //     this.lyric = res && res.lyric || '';
        //     this.lyricRef = new Lyric(this.lyric);
        // }, (err) => {
        //     console.log(err);
        // });
        // tslint:disable-next-line:max-line-length
        this.song = JSON.parse(`{"album":{"alias":[],"artist":{"albumSize":0,"alias":[],"briefDesc":"","id":0,"img1v1Id":0,"img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","musicSize":0,"name":"","picId":0,"picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","trans":""},"artists":[{"albumSize":0,"alias":[],"briefDesc":"","id":10204,"img1v1Id":0,"img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","musicSize":0,"name":"杨千嬅","picId":0,"picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","trans":""}],"blurPicUrl":"http://p1.music.126.net/mzrSrgvKFqT_-rg1yZw6yw==/42880953500022.jpg","briefDesc":"","commentThreadId":"R_AL_3_31411","company":"环球唱片","companyId":0,"copyrightId":7003,"description":"","id":31411,"name":"万紫千红演唱会2002","pic":42880953500022,"picId":42880953500022,"picUrl":"http://p1.music.126.net/mzrSrgvKFqT_-rg1yZw6yw==/42880953500022.jpg","publishTime":1028160000000,"size":27,"songs":[],"status":1,"subType":"现场版","tags":"","type":"专辑"},"alias":[],"artists":[{"albumSize":0,"alias":[],"briefDesc":"","id":10204,"img1v1Id":0,"img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","musicSize":0,"name":"杨千嬅","picId":0,"picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","trans":""}],"audition":null,"bMusic":{"bitrate":96000,"dfsId":0,"extension":"mp3","id":10277097,"name":"再见二丁目(Live)","playTime":412839,"size":4987874,"sr":44100,"volumeDelta":-0.000265076},"commentThreadId":"R_SO_4_317245","copyFrom":"","copyright":1,"copyrightId":7003,"crbt":"0b806b8840c10021f1b69e2ad48d338a","dayPlays":0,"disc":"2","duration":412839,"fee":8,"ftype":0,"hMusic":{"bitrate":320000,"dfsId":0,"extension":"mp3","id":10277095,"name":"再见二丁目(Live)","playTime":412839,"size":16537548,"sr":44100,"volumeDelta":0.0265486},"hearTime":0,"id":317245,"lMusic":{"bitrate":96000,"dfsId":0,"extension":"mp3","id":10277097,"name":"再见二丁目(Live)","playTime":412839,"size":4987874,"sr":44100,"volumeDelta":-0.000265076},"mMusic":{"bitrate":160000,"dfsId":0,"extension":"mp3","id":10277096,"name":"再见二丁目(Live)","playTime":412839,"size":8288080,"sr":44100,"volumeDelta":0},"mp3Url":null,"mvid":0,"name":"再见二丁目(Live) - live","no":5,"playedNum":0,"popularity":100,"position":22,"ringtone":"600902000005366014","rtUrl":null,"rtUrls":[],"rtype":0,"rurl":null,"score":100,"starred":false,"starredNum":0,"status":0}`);
        this.lyricStr = '[00:24.81]满街脚步 突然静了↵[00:31.92]满天柏树 突然没有动摇↵[00:37.37]这一刹 我只需要 一罐热茶吧↵[00:44.01]那味道 似是什么 都不紧要↵[00:49.39]↵[00:52.09]唱片店内 传来异国民谣↵[00:58.47]那种快乐 突然被我需要↵[01:03.69]不亲切 至少不似 想你般奥妙↵[01:09.89]情和调 随著怀缅 变得萧条↵[01:15.62]↵[01:17.79]原来过得很快乐↵[01:20.88]只我一人未发觉↵[01:24.15]如能忘掉渴望↵[01:27.12]岁月长 衣裳薄↵[01:30.42]无论于什么角落↵[01:33.68]不假设你或会在旁↵[01:37.22]我也可畅游异国 放心吃喝↵[01:43.47]↵[02:09.81]转街过巷 就如滑过浪潮↵[02:16.27]听天说地 仍然剩我心跳↵[02:21.85]关于你 冥想不了 可免都免掉↵[02:28.14]情和欲 留待下个化身燃烧↵[02:34.02]↵[02:35.71]原来过得很快乐↵[02:39.40]只我一人未发觉↵[02:42.59]如能忘掉渴望↵[02:45.31]岁月长 衣裳薄↵[02:48.56]无论于什么角落↵[02:52.23]不假设你或会在旁↵[02:55.62]我也可畅游异国 放心吃喝↵[03:01.89]↵[03:02.70]原来我非不快乐↵[03:05.95]只我一人未发觉↵[03:09.07]如能忘掉渴望↵[03:12.05]岁月长 衣裳薄↵[03:15.18]无论于什么角落↵[03:18.57]不假设你或会在旁↵[03:22.08]我也可畅游异国 再找记托↵[03:28.40]↵[03:30.69]我也可畅游异国 再找记托记托↵';
        this.audioStr = '/assets/temp/yitimo.mp3';
    }

    public onPlay(curr: number) {
        this.current = curr;
    }
}
