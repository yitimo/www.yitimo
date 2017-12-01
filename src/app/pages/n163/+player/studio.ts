import { Injectable } from '@angular/core';
import { StorageService } from '../../../-core';
import { N163Service } from '../n163.service';
import { Audio } from './audio';
import { Observable } from 'rxjs/Observable';

export interface PlayStatus {
    style: 'single' | 'order' | 'round' | 'random';
    list_id: number;
    play_id: number;
}

@Injectable()
export class StudioService {
    private playStatus: PlayStatus;
    private idList: number[];
    private index: number;
    private infoList = {};
    private srcList = {};
    private audioRef: Audio;
    constructor(
        private storage: StorageService,
        private n163: N163Service
    ) {
        this.playStatus = this.storage.Get('PLayStatus') || {style: 'order', list_id: 0, play_id: 0};
        this.idList = this.storage.Get('PlayList_' + this.playStatus.list_id) || [];
        this.audioRef = new Audio();
        this.renderInfo().subscribe((res) => {
            for (let item of res) {
                this.infoList[item.id] = item;
            }
            console.log(`歌曲信息渲染完成`);
        }, (err) => {
            console.log(err);
        });
    }
    /**
     * 添加id到播放列表
     * 会先请求渲染得到歌曲基本信息
     * 待播放时才会真正请求渲染播放src
     */
    public Add(ids: number | number[]): Promise<{state: boolean, msg?: string}> {
        return new Promise<{state: boolean, msg?: string}>((resolve, reject) => {
            ids = ids instanceof Array ? ids : [ids];
            let notHave = [];
            for (let id of ids) {
                if (this.idList.indexOf(id) === -1) {
                    notHave.push(id);
                }
            }
            if (!notHave.length) {
                resolve({state: true, msg: '没有歌曲要添加'});
                return;
            }
            this.renderInfo(notHave).subscribe((res) => {
                for (let item of res) {
                    this.infoList[item.id] = item;
                }
                this.idList.concat(notHave);
                this.storage.Set(`PlayList_${this.playStatus.list_id}`, this.idList);
                resolve({state: true});
                return;
            }, (err) => {
                reject({state: false, msg: `渲染info失败【${err}】`});
                return;
            });
        });
    }
    /**
     * 播放指定id的歌曲
     * 单次生命周期内需要首次渲染(请求获取src)，之后缓存
     * @param id id必填 不填视为列表中再无歌曲
     */
    public Play(id?: number): Promise<{state: boolean, msg?: string}> {
        return new Promise<{state: boolean, msg?: string}>((resolve, reject) => {
            if (!id) {
                reject({state: false, msg: '列表中再无歌曲'});
                return;
            }
            if (this.idList.indexOf(id) === -1) {
                this.idList.push(id);
                this.storage.Set(`PlayList_${this.playStatus.list_id}`, this.idList);
            }
            if (!this.srcList[id]) {
                this.renderSrc(id).subscribe((res) => {
                    this.srcList[id] = res[0];
                    return this.Play(id);
                }, (err) => {
                    reject(`播放歌曲失败【${err}】`);
                    return;
                });
            } else if (!this.srcList[id].url) {
                reject({state: false, msg: `该歌曲暂无版权`});
                return;
            } else {
                this.audioRef.play(this.srcList[id].url);
                this.playStatus.play_id = id;
                this.storage.Set(`PLayStatus`, this.playStatus);
                resolve({state: true});
                return;
            }
        });
    }
    public Next(): Promise<{state: boolean, msg?: string}> {
        let find = this.idList.indexOf(this.playStatus.play_id);
        switch (this.playStatus.style) {
            case 'random':
            find = Math.floor(Math.random() * this.idList.length);
            break;
            case 'single':
            break;
            case 'round':
            find = (find + 1) % this.idList.length;
            break;
            case 'order':
            default:
            if (find + 1 >= this.idList.length) {
                return new Promise((res, rej) => rej({state: false, msg: '没有更多歌曲了'}));
            }
            find = find + 1;
            break;
        }
        return this.Play(this.idList[find]);
    }
    public Prev(): Promise<{state: boolean, msg?: string}> {
        let find = this.idList.indexOf(this.playStatus.play_id);
        switch (this.playStatus.style) {
            case 'random':
            find = Math.floor(Math.random() * this.idList.length);
            break;
            case 'single':
            break;
            case 'round':
            find = (find - 1) < 0 ? (this.idList.length - 1) : (find - 1);
            break;
            case 'order':
            default:
            if (find - 1 < 0) {
                return new Promise((res, rej) => rej({state: false, msg: '没有更多歌曲了'}));
            }
            find = find - 1;
            break;
        }
        return this.Play(this.idList[find]);
    }
    /**
     * 移除播放列表中指定id的歌曲
     * 若正在播放则自动播放上一曲
     */
    public Remove(id): Promise<{state: boolean, msg?: string}> {
        return new Promise<{state: boolean, msg?: string}>((resolve, reject) => {
            let find = this.idList.indexOf(id);
            if (find === -1) {
                reject({state: false, msg: '列表中不存在该歌曲'});
                return;
            }
            this.idList.splice(find, 1);
            this.storage.Set(`PlayList_${this.playStatus.list_id}`, this.idList);
            delete this.srcList[id];
            delete this.infoList[id];
            find = find - 1 || 0;
            if (this.playStatus.play_id === id && !this.audioRef.Paused()) {
                this.audioRef.abort();
                return this.Play(this.idList[find]);
            }
            resolve({state: true});
        });
    }
    /**
     * 监听当前播放歌曲的进度
     * @param time 监听周期
     */
    public Listen(time?: number): Observable<{
        current: number,
        duration: number,
        buffers: Array<[number, number]>,
        percent: string,
        paused: boolean
    }> {
        return this.audioRef.listen(time);
    }
    /**
     * 返回当前播放音频的数据
     * 包括 长度、进度、进度百分比、是否已暂停、缓冲数组
     */
    public Current(): {
        current: number,
        duration: number,
        buffers: Array<[number, number]>,
        percent: string,
        paused: boolean
    } {
        return this.audioRef.Status();
    }
    public Style(style: 'random' | 'order' | 'round' | 'single') {
        this.playStatus.style = style;
        this.storage.Set('PLayStatus', this.playStatus);
    }
    /**
     * 将指定的id或ids渲染到播放src
     * 不指定ids时将尝试重新渲染idList
     * 渲染结果需自行考虑覆盖原列表或拼接
     * @param ids 单个id或id列表
     */
    private renderSrc(ids?: number | number[]): Observable<any> {
        if (ids || this.idList.length) {
            return this.n163.Download(ids || this.idList).map((res) => {
                this.infoList = res;
                return res;
            }, (err) => {
                throw err;
            });
        } else {
            return Observable.throw('no id in idList');
        }
    }
    /**
     * 将指定的id或ids渲染到info
     * 不指定ids时将尝试重新渲染idList
     * 渲染结果需自行考虑覆盖原列表或拼接
     * @param ids 单个id或id列表
     */
    private renderInfo(ids?: number | number[]): Observable<any> {
        if (ids || this.idList.length) {
            return this.n163.Info(ids || this.idList).map((res) => {
                this.infoList = res;
                return res;
            }, (err) => {
                throw err;
            });
        } else {
            return Observable.throw('no id in idList');
        }
    }
}
