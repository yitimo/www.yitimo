import { Injectable, EventEmitter } from '@angular/core';
import { StorageService } from '../services/storage';
import { N163Service } from '../services/n163.service';
import { Audio } from './audio';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

export interface PlayStatus {
    style: 'single' | 'order' | 'round' | 'random';
    list_id: number;
    play_id: number;
}

@Injectable()
export class StudioService {
    public idList: number[];
    public infoList = {};
    public srcList = {};
    public lrcList = {};
    public $init: Observable<any> = Observable.of(true);
    private playStatus: PlayStatus;
    private index: number;
    private audioRef: Audio;
    private inited: boolean = true;
    private $listen: Observable<any>;
    private $watch: Observable<any>;
    private onSwitch: EventEmitter<any> = new EventEmitter<any>();
    private renderInfoList: number[] = [];
    private renderSrcList: number[] = [];
    private renderLrcList: number = 0;
    private currId: number = 0;
    private reTryCount: number = 1;
    constructor(
        private storage: StorageService,
        private n163: N163Service
    ) {
        // 保存的状态
        this.playStatus = this.storage.Get('PLayStatus') || {style: 'order', list_id: 0, play_id: 0};
        // 保存的播放列表
        this.idList = this.storage.Get('PlayList_' + this.playStatus.list_id) || [];
        // 初始化音频引用
        this.audioRef = new Audio();
        // 初次渲染列表中的歌曲
        if (this.idList.length) {
            this.$init = new Observable<any>((observer) => {
                this.renderInfo().subscribe(() => {
                    observer.next(true);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                });
            });
        }
        // 取得监听观察者
        this.$listen = this.audioRef.listen().map((res) => {
            if (res.duration) {
                this.reTryCount = 1;
            }
            return res;
        });
        this.$watch = Observable.from(this.onSwitch).publish().refCount();
        this.audioRef.OnForbidden().subscribe(() => {
            // 163的url过期后尝试重新播放
            console.log('尝试重新渲染');
            if (this.reTryCount) {
                delete this.srcList[this.currId];
                this.Load(this.currId).then(() => {
                    this.Play(this.currId);
                });
                this.reTryCount--;
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
    public Watch(): Observable<any> {
        return this.$watch;
    }
    public CurrentId() {
        return this.playStatus.play_id;
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
        if (this.currId === id) {
            this.audioRef.toggle();
        } else {
            this.Play(id).catch((err) => {
                if (err === '歌曲尚未加载') {
                    this.Load(id).then((res) => {
                        this.Play(id);
                    });
                }
            });
        }
    }
    public Style(style: 'random' | 'order' | 'round' | 'single') {
        this.playStatus.style = style;
        this.storage.Set('PLayStatus', this.playStatus);
    }
    /**
     * 用于在实际页面中获取歌曲基本信息
     * 会尝试获取缓存的数据
     * 若是正在请求的数据(一般发生在初次渲染和重复点击) 则会等待(仍会得到结果但保证只请求一次)
     * 若缓存不存在且未在请求队列则请求获取
     */
    public Info(id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this.infoList[id]) {
                resolve(this.infoList[id]);
                return;
            }
            if (this.renderInfoList.indexOf(id) >= 0) {
                this.renderInfo(id).subscribe();
                let wait = window.setInterval(() => {
                    if (this.infoList[id]) {
                        window.clearInterval(wait);
                        resolve(this.infoList[id]);
                    }
                }, 300);
            } else {
                if (this.idList.indexOf(id) < 0) {
                    this.idList.push(id);
                }
                this.storage.Set(`PlayList_${this.playStatus.list_id}`, this.idList);
                this.renderInfo(id).subscribe((res) => {
                    console.log(res);
                    resolve(res[0]);
                }, (err) => {
                    reject(err);
                });
            }
        });
    }
    /**
     * 添加id到播放列表
     * 会先请求渲染得到歌曲基本信息
     * 除去未完成的请求，不管是已有信息还是新增信息都会作为结果返回
     */
    public Add(ids: number | number[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            ids = ids instanceof Array ? ids : [ids];
            let rs = [];
            let need = [];
            for (let id of ids) {
                if (this.infoList[id]) {
                    rs.push();
                } else if (this.renderInfoList.indexOf(id) < 0) {
                    need.push(id);
                    if (this.idList.indexOf(id) < 0) {
                        this.idList.push(id);
                    }
                }
            }
            if (!need.length) {
                resolve(rs);
                return;
            }
            this.storage.Set(`PlayList_${this.playStatus.list_id}`, this.idList);
            this.renderInfo(need).subscribe((res) => {
                rs = rs.concat(res);
                resolve(rs);
            }, (err) => {
                reject(`渲染info失败【${err}】`);
            });
        });
    }
    /**
     * 渲染传入的id的歌曲src
     * 会过滤已渲染的src 但会保证所有传入的src都渲染完成
     */
    public Load(ids: number | number[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.renderSrc(ids).subscribe((res) => {
                resolve(res);
            }, (err) => {
                reject(`渲染src失败【${err}】`);
            });
        });
    }
    /**
     * 播放指定id的歌曲
     * 单次生命周期内需要首次渲染(请求获取src)，之后缓存
     * 可能存在歌曲正在加载情况，此时会轮询等待
     * @param id id必填 不填视为列表中再无歌曲
     */
    public Play(id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (!this.srcList[id]) {
                reject('歌曲尚未加载');
            } else if (!this.srcList[id].url) {
                reject(`该歌曲暂无版权`);
            } else {
                console.log('直接得到歌曲src');
                this.audioRef.play(this.srcList[id].url);
                // this.audioRef.play();
                this.onSwitch.emit(id);
                this.playStatus.play_id = id;
                this.currId = id;
                this.storage.Set(`PLayStatus`, this.playStatus);
                resolve();
            }
        });
    }
    public Lyric(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.lrcList[id]) {
                resolve(this.lrcList[id]);
                return;
            }
            if (this.renderLrcList === id) {
                this.renderLrc(id).subscribe();
                let wait = window.setInterval(() => {
                    if (this.lrcList[id]) {
                        window.clearInterval(wait);
                        resolve(this.lrcList[id]);
                    }
                }, 300);
            } else {
                this.renderLrc(id).subscribe((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
            }
        });
    }
    /**
     * 将指定的id或ids渲染到info
     * 不指定ids时将尝试重新渲染idList
     * 渲染前会设置渲染列表 以供避免重复请求
     * 渲染后会清理渲染列表
     * @param ids 单个id或id列表
     */
    private renderInfo(ids?: number | number[]): Observable<any> {
        ids = ids ? (ids instanceof Array ? ids : [ids]) : this.idList;
        let need = [];
        for (let id of ids) {
            if (this.renderInfoList.indexOf(id) < 0 && !this.infoList[id]) {
                need.push(id);
            }
        }
        if (!need.length) {
            return Observable.of([]);
        }
        this.renderInfoList = this.renderInfoList.concat(need);
        return this.n163.Info(need).map((res) => {
            for (let item of res) {
                this.infoList[item.id] = item;
                this.renderInfoList.splice(this.renderInfoList.indexOf(item.id), 1);
            }
            return res;
        });
    }
    /**
     * 将指定的id渲染到lyric
     * 渲染前会设置渲染列表 以供避免重复请求
     * 渲染后会清理渲染列表
     * @param id 歌曲id
     */
    private renderLrc(id: number): Observable<any> {
        this.renderLrcList = id;
        return this.n163.Lyric(id).map((res) => {
            this.lrcList[id] = res;
            this.renderLrcList = 0;
            return res;
        });
    }
    /**
     * 将指定的id或ids渲染到播放src
     * 不指定ids时将尝试重新渲染idList
     * 渲染前会设置渲染列表 以供避免重复请求
     * 渲染后会清理渲染列表
     * @param ids 单个id或id列表
     */
    private renderSrc(ids?: number | number[]): Observable<any> {
        ids = ids ? (ids instanceof Array ? ids : [ids]) : this.idList;
        let need = [];
        for (let i = 0; i < ids.length; i++) {
            if (this.renderSrcList.indexOf(ids[i]) < 0 && !this.srcList[ids[i]]) {
                need.push(ids[i]);
                ids[i] = 0;
            }
        }
        if (!need.length) {
            return Observable.of([]);
        }
        this.renderSrcList = this.renderSrcList.concat(need);
        return this.n163.Download(need).map((res) => {
            for (let item of res) {
                this.srcList[item.id] = item;
                this.renderSrcList.splice(this.renderSrcList.indexOf(item.id), 1);
            }
            return res;
        });
    }
}
