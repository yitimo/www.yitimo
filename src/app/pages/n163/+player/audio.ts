import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';

export class Audio {
    private useBuffer: boolean = false;
    private audioRef: HTMLAudioElement;
    constructor(
        private src?: string,
        private buffer?: AudioBuffer
    ) {
        if (buffer) {
            this.useBuffer = true;
        }
        this.audioRef = window.document.createElement('audio');
        this.audioRef.src = src;
    }
    public Status() {
        return Observable.of({
            current: this.audioRef.currentTime,
            duration: this.audioRef.duration,
            bufferd: this.formatBuffered(this.audioRef.buffered),
            paused: this.audioRef.paused
        });
    }
    /**
     * 暂停或播放
     * 若是播放则返回 true
     * 否则返回 false
     */
    public toggle(): boolean {
        if (this.audioRef.paused) {
            this.audioRef.play();
            return true;
        } else {
            this.audioRef.pause();
            return false;
        }
    }
    public play() {
        this.audioRef.play();
    }
    public pause() {
        this.audioRef.pause();
    }
    public abort() {
        this.audioRef.pause();
        this.audioRef.currentTime = 0;
    }
    /**
     * time 大于1则跳转到指定时间(秒)
     * 否则跳转到指定百分比的进度处
     * @param time 仅正值有效
     */
    public skip(time: number) {
        if (time > 1) {
            this.audioRef.currentTime = time;
        } else if (time > 0) {
            this.audioRef.currentTime = time * this.audioRef.duration;
        }
        return {
            current: this.audioRef.currentTime,
            duration: this.audioRef.duration,
            buffers: this.formatBuffered(this.audioRef.buffered),
            paused: this.audioRef.paused
        };
    }
    /**
     * 监听播放 可订阅普通数据(播放进度) 以及重要事件(可选)
     * @param interval 普通事件的触发周期
     * @param impEvent 订阅重要事件
     */
    public listen(time?: number): Observable<any> {
        time = time || 1000;
        return new Observable((observer) => {
            let interval;
            this.audioRef.onplay = () => {
                observer.next({
                    current: this.audioRef.currentTime,
                    duration: this.audioRef.duration,
                    buffers: this.formatBuffered(this.audioRef.buffered),
                    paused: this.audioRef.paused
                });
                interval = setInterval(() => {
                    observer.next({
                        current: this.audioRef.currentTime,
                        duration: this.audioRef.duration,
                        buffers: this.formatBuffered(this.audioRef.buffered),
                        paused: this.audioRef.paused
                    });
                }, time);
            };
            this.audioRef.onabort = () => {
                observer.next({
                    current: this.audioRef.currentTime,
                    duration: this.audioRef.duration,
                    buffers: this.formatBuffered(this.audioRef.buffered),
                    paused: this.audioRef.paused
                });
                clearInterval(interval);
            };
            this.audioRef.onended = () => {
                observer.next({
                    current: this.audioRef.currentTime,
                    duration: this.audioRef.duration,
                    buffers: this.formatBuffered(this.audioRef.buffered),
                    paused: this.audioRef.paused
                });
                clearInterval(interval);
            };
            this.audioRef.onpause = () => {
                observer.next({
                    current: this.audioRef.currentTime,
                    duration: this.audioRef.duration,
                    buffers: this.formatBuffered(this.audioRef.buffered),
                    paused: this.audioRef.paused
                });
                clearInterval(interval);
            };
        });
    }
    private formatBuffered(buffered: TimeRanges): Array<[number, number]> {
        let rs = [];
        for (let i = 0; i < buffered.length; i++) {
            rs.push([buffered.start(i), buffered.end(i)]);
        }
        return rs;
    }
}
