import { Injectable } from '@angular/core';
import { StorageService } from '../../../-core';

export interface PlayStatus {
    style: 'single' | 'order' | 'round' | 'random';
    mode: number;
    index: number;
}

@Injectable()
export class StudioService {
    private playStatus: PlayStatus;
    private idList: number[];
    private playList: string[] = [];
    private mode: 'list' | 'temp';
    constructor(
        private storage: StorageService
    ) {
        this.playStatus = this.storage.Get('PLayStatus') || {style: 'order', mode: 0, index: -1};
        this.idList = this.storage.Get('PlayList_' + this.playStatus.mode) || [];
        this.renderList();
    }
    // Just add to studio, only played when be the only song
    public Add() {
        //
    }
    // Add to studio and play directly
    public Play() {
        //
    }
    private renderList() {
        if (!this.idList.length) {
            return;
        }
        // 信息 下载链接 分别批量获取 单次生命周期内缓存
        // 歌词必须单个单个获取 这个就等播放再获取 单次生命周期内缓存
    }
}
