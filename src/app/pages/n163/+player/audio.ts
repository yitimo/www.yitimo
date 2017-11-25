import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

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
        } else {
            return;
        }
    }
    /**
     * 监听播放 可订阅普通数据(播放进度) 以及重要事件(可选)
     * @param interval 普通事件的触发周期
     * @param impEvent 订阅重要事件
     */
    public listen(intervalTime: number, impEvent?: string[]): Observable<any> {
        return new Observable((observer) => {
            let interval;
            this.audioRef.onplay = () => {
                interval = window.setInterval(() => {
                    observer.next({event: 'progress', data: {}});
                }, intervalTime || 1000);
            };
            this.audioRef.onabort = () => {
                window.clearInterval(interval);
            };
            this.audioRef.onended = () => {
                window.clearInterval(interval);
            };
            this.audioRef.onpause = () => {
                window.clearInterval(interval);
            };
        });
    }
}
