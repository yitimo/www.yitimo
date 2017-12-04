import { Input, Component, OnChanges, SimpleChanges, OnInit, ViewContainerRef, AfterViewInit } from '@angular/core';
import { LyricPiece, Lyric, StudioService } from '../../-core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'lyric-panel',
    templateUrl: 'lyric-panel.component.html',
    styleUrls: ['lyric-panel.component.css']
})
export class LyricPanelComponent implements AfterViewInit {
    public lyricRef: Lyric;
    public lyrics: LyricPiece[] = [];
    public error: boolean = false;
    private currIndex: number;
    private current: number;
    private prevIndex: number = -1;
    private scrolling: boolean = false;
    constructor(
        private studio: StudioService,
        private vcRef: ViewContainerRef
    ) {
        this.currIndex = -1;
        if (this.studio.CurrentId()) {
            this.studio.Lyric(this.studio.CurrentId()).then((res) => {
                this.lyricRef = new Lyric(res.lyric);
                this.lyrics = this.lyricRef.Lyric;
            }).catch((err) => {
                console.log(err);
            });
        }
        this.studio.Watch().subscribe((id) => {
            console.log('渲染歌词');
            this.studio.Lyric(id).then((res) => {
                this.lyricRef = new Lyric(res.lyric);
                this.lyrics = this.lyricRef.Lyric;
            }).catch((err) => {
                console.log(err);
            });
        });
        this.studio.Listen().subscribe((res) => {
            this.current = res.current;
            this.currIndex = this.prevIndex;
            this.currIndex = this.lyrics.findIndex((e, i) => {
                let ctime = e.time[0] * 60 + e.time[1];
                let ntime = this.lyrics[i + 1] ? (this.lyrics[i + 1].time[0] * 60 + this.lyrics[i + 1].time[1]) :
                (ctime + 5);
                return ctime < this.current && ntime > this.current;
            }) + 1 || this.currIndex;
            if (this.currIndex !== this.prevIndex && !this.scrolling) {
                let client: HTMLElement = this.vcRef.element.nativeElement.getElementsByClassName('body')[0];
                let current: HTMLElement = this.vcRef.element.nativeElement.getElementsByClassName('current')[0];
                if (!client || !current) {
                    return;
                }
                this.smoothScroll(client.scrollTop, current.offsetTop - client.clientHeight / 2, client);
            }
        });
    }

    public ngAfterViewInit() {
        // 处理歌词拖拽
    }

    public currCheck(index: number): boolean {
        return this.currIndex === index;
    }

    public dispCheck(index: number): boolean {
        return (this.currIndex > (index - 3)) && (this.currIndex < (index + 3));
    }

    private smoothScroll(from: number, to: number, dom: HTMLElement) {
        let need = to - dom.scrollTop;
        this.scrolling = true;
        if (need < 100) {
            let px = need / 15;
            let i = 0;
            // 20毫秒间隔
            let doit = window.setInterval(() => {
                i++;
                dom.scrollTop += px;
                if (i === 15) {
                    window.clearInterval(doit);
                    this.scrolling = false;
                }
            }, 20);
        } else if (need < 500) {
            let px = need / 30;
            let i = 0;
            // 10毫秒间隔
            let doit = window.setInterval(() => {
                i++;
                dom.scrollTop += px;
                if (i === 30) {
                    window.clearInterval(doit);
                    this.scrolling = false;
                }
            }, 10);
        } else if (need < 1000) {
            let px = need / 60;
            let i = 0;
            // 5毫秒间隔
            let doit = window.setInterval(() => {
                i++;
                dom.scrollTop += px;
                if (i === 60) {
                    window.clearInterval(doit);
                    this.scrolling = false;
                }
            }, 5);
        } else {
            // 瞬间移动
            dom.scrollTop = to;
            this.scrolling = false;
        }
    }
}
