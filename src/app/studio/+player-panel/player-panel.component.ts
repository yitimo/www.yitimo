import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Audio, StudioService, StudioRouteService } from '../-player';
import 'rxjs/add/observable/interval';
import { DialogPopupComponent } from '../../-shared';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'player-panel',
    templateUrl: 'player-panel.component.html',
    styleUrls: ['player-panel.component.css']
})
export class PlayerPanelComponent {
    public duration: number = 0;
    public current: number = 0;
    public paused: boolean = true;
    public buffers: Array<[number, number]> = [];
    public percent: string = '0%';
    constructor(
        public studio: StudioService,
        public router: StudioRouteService,
        private dialog: MatDialog
    ) {
        this.studio.Listen().subscribe((res) => {
            this.duration = res.duration;
            this.current = res.current;
            this.buffers = res.buffers;
            this.paused = res.paused;
            this.percent = res.percent;
        });
    }
    public skip($event: MouseEvent) {
        let pDom = document.getElementsByClassName('audio-duration')[0];
        this.current = Math.floor(this.duration * ($event.clientX -
            pDom.getBoundingClientRect().left) / pDom.clientWidth);
        this.percent = (this.current / this.duration * 100).toFixed(2) + '%';
        this.studio.Skip(this.current);
    }
    public abort() {
        this.studio.Abort();
    }
    public openUp() {
        this.router.lyric();
    }
    public closeDown() {
        this.router.root();
    }
    public playPrev() {
        this.studio.Prev().catch((err) => {
            this.dialog.open(DialogPopupComponent, {data: {msg: err}});
        });
    }

    public playNext() {
        this.studio.Next().catch((err) => {
            this.dialog.open(DialogPopupComponent, {data: {msg: err}});
        });
    }

    public toggle() {
        this.studio.Toggle(this.studio.CurrentId());
    }

    public switchStyle() {
        let curr = this.studio.Style();
        switch (curr) {
            case 'order':
            this.studio.Style('round');
            break;
            case 'random':
            this.studio.Style('order');
            break;
            case 'round':
            this.studio.Style('single');
            break;
            case 'single':
            this.studio.Style('random');
            break;
            default:
            break;
        }
    }

    public doExit() {
        let ask = this.dialog.open(DialogPopupComponent, {data: {msg: '确定要退出播放器吗?', ok: '退出', no: '不了'}});
        ask.afterClosed().subscribe((isOk) => {
            if (isOk) {
                this.studio.Abort();
                this.router.exit();
            }
        });
    }
}
