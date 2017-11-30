import { Injectable } from '@angular/core';
import { StorageService } from '../../../-core';
import { N163Service } from '../n163.service';
import { Audio } from './audio';

export interface PlayStatus {
    style: 'single' | 'order' | 'round' | 'random';
    mode: number;
    index: number;
}

@Injectable()
export class StudioService {
    private playStatus: PlayStatus;
    private idList: number[];
    private index: number;
    private infoList: any[];
    private srcList: any[];
    private mode: 'list' | 'temp';
    private audioRef: Audio;
    constructor(
        private storage: StorageService,
        private n163: N163Service
    ) {
        this.playStatus = this.storage.Get('PLayStatus') || {style: 'order', mode: 0, index: -1};
        this.idList = this.storage.Get('PlayList_' + this.playStatus.mode) || [];
        this.audioRef = new Audio();
        this.renderList();
    }
    // add id to idList
    // render id to srcList & infoList
    public Add(id: number | number[]) {
        this.attachRender(id);
    }
    // add id to idList
    // render id to srcList & infoList
    // play this id after rendered
    public Play(id: number) {
        this.attachRender(id).then(() => {
            this.playId(id);
        });
    }
    public playId(id: number) {
        if (id === undefined) {
            return;
        }
        let find = this.idList.indexOf(id);
        let getSrc = this.srcList[find].url;
        if (!getSrc) {
            console.log('该歌曲无法播放');
            this.Next();
        } else {
            this.audioRef.play();
        }
    }
    public Next() {
        this.index++;
        this.playId(this.idList[this.index]);
    }
    private renderList() {
        if (!this.idList.length) {
            return;
        }
        this.n163.Info(this.idList).subscribe((res) => {
            this.infoList = res;
        }, (err) => {
            console.log(err);
        });
        this.n163.Download(this.idList).subscribe((res) => {
            this.srcList = res;
        }, (err) => {
            console.log(err);
        });
    }
    private attachRender(ids: number | number[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.n163.Info(this.idList).subscribe((res) => {
                this.infoList = this.infoList.concat(res);
            }, (err) => {
                console.log(err);
            });
            this.n163.Download(this.idList).subscribe((res) => {
                this.srcList = this.srcList.concat(res);
                resolve();
            }, (err) => {
                console.log(err);
                reject(err);
            });
        });
    }
}
