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
    private lrcList = {};
    private audioRef: Audio;
    private inited: boolean = true;
    private $listen: Observable<any>;
    constructor(
        private storage: StorageService,
        private n163: N163Service
    ) {
        this.playStatus = this.storage.Get('PLayStatus') || {style: 'order', list_id: 0, play_id: 0};
        this.idList = this.storage.Get('PlayList_' + this.playStatus.list_id) || [];
        this.audioRef = new Audio();
        if (this.playStatus.play_id) {
            this.Add(this.idList).then((song) => {
                this.renderSrc(song.id).subscribe((res) => {
                    this.inited = true;
                    if (res[0].url) {
                        this.audioRef.set(res[0].url);
                    } else {
                        console.log(`初始化失败【没有版权】`);
                        this.playStatus.play_id = 0;
                    }
                }, (err) => {
                    this.inited = true;
                    console.log(`初始化失败【${err}】`);
                });
            }).catch((err) => {
                this.inited = true;
                console.log(`初始化失败【${err}】`);
            });
        }
        this.$listen = this.audioRef.listen();
    }
    public Inited(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let until = window.setInterval(() => {
                if (this.inited) {
                    window.clearInterval(until);
                    resolve();
                }
            }, 500);
        });
    }
    /**
     * 添加id到播放列表
     * 会先请求渲染得到歌曲基本信息
     * 待播放时才会真正请求渲染播放src
     */
    public Add(ids: number | number[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (!this.inited) {
                reject(`未初始化完成`);
                return;
            }
            this.inited = false;
            ids = ids instanceof Array ? ids : [ids];
            let notHave = [];
            let notRender = [];
            for (let id of ids) {
                if (this.idList.indexOf(id) === -1) {
                    notHave.push(id);
                }
                if (!this.infoList[id]) {
                    notRender.push(id);
                }
            }
            if (!notHave.length && !notRender.length) {
                resolve(this.infoList[ids[0]]);
            } else {
                this.idList = this.idList.concat(notHave);
                this.storage.Set(`PlayList_${this.playStatus.list_id}`, this.idList);
                this.renderInfo(notRender).subscribe((res) => {
                    for (let item of res) {
                        this.infoList[item.id] = item;
                    }
                    resolve(this.infoList[ids[0]]);
                }, (err) => {
                    reject(`渲染info失败【${err}】`);
                });
            }
        });
    }
    /**
     * 播放指定id的歌曲
     * 单次生命周期内需要首次渲染(请求获取src)，之后缓存
     * @param id id必填 不填视为列表中再无歌曲
     */
    public Play(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (!this.inited) {
                reject(`未初始化完成`);
                return;
            }
            if (!id) {
                reject('列表中再无歌曲');
                return;
            }
            if (this.idList.indexOf(id) === -1) {
                this.idList.push(id);
                this.storage.Set(`PlayList_${this.playStatus.list_id}`, this.idList);
            }
            if (!this.srcList[id]) {
                this.renderSrc(id).subscribe((res) => {
                    this.srcList[id] = res[0];
                    if (!this.srcList[id].url) {
                        reject(`该歌曲暂无版权`);
                    } else {
                        this.audioRef.play(this.srcList[id].url);
                        this.playStatus.play_id = id;
                        this.storage.Set(`PLayStatus`, this.playStatus);
                        resolve();
                    }
                }, (err) => {
                    reject(`播放歌曲失败【${err}】`);
                });
            } else if (!this.srcList[id].url) {
                reject(`该歌曲暂无版权`);
            } else {
                this.audioRef.play(this.srcList[id].url);
                this.playStatus.play_id = id;
                this.storage.Set(`PLayStatus`, this.playStatus);
                resolve();
            }
        });
    }
    public Next(): Promise<any> {
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
                return new Promise((res, rej) => rej('没有更多歌曲了'));
            }
            find = find + 1;
            break;
        }
        return this.Play(this.idList[find]);
    }
    public Prev(): Promise<any> {
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
                return new Promise((res, rej) => rej('没有更多歌曲了'));
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
    public Remove(id): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let find = this.idList.indexOf(id);
            if (find === -1) {
                reject('列表中不存在该歌曲');
            } else {
                this.idList.splice(find, 1);
                this.storage.Set(`PlayList_${this.playStatus.list_id}`, this.idList);
                delete this.srcList[id];
                delete this.infoList[id];
                find = find - 1 || 0;
                if (this.playStatus.play_id === id && !this.audioRef.Paused()) {
                    this.audioRef.abort();
                    return this.Play(this.idList[find]);
                }
                resolve();
            }
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
        return this.$listen;
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
    public Skip(time: number) {
        this.audioRef.skip(time);
    }
    public Abort() {
        this.audioRef.abort();
    }
    public Toggle(id: number) {
        if (this.playStatus.play_id === id) {
            this.audioRef.toggle();
        } else {
            this.Play(id);
        }
    }
    public Style(style: 'random' | 'order' | 'round' | 'single') {
        this.playStatus.style = style;
        this.storage.Set('PLayStatus', this.playStatus);
    }
    public Lyric(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.lrcList[id]) {
                resolve(this.lrcList[id]);
            } else {
                this.renderLrc(id).subscribe((res) => {
                    this.lrcList[id] = res;
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
            }
        });
    }
    /**
     * 将指定的id或ids渲染到播放src
     * 不指定ids时将尝试重新渲染idList
     * 渲染结果需自行考虑覆盖原列表或拼接
     * @param ids 单个id或id列表
     */
    private renderSrc(ids?: number | number[]): Observable<any> {
        if (ids || this.idList.length) {
            return this.n163.Download(ids || this.idList);
        } else {
            return new Observable((observer) => observer.error('no id in idList'));
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
            return this.n163.Info(ids || this.idList);
        } else {
            return new Observable((observer) => observer.error('no id in idList'));
        }
    }
    private renderLrc(id: number): Observable<any> {
        return this.n163.Lyric(id);
    }
}
