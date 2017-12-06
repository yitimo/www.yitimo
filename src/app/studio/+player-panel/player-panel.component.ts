import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Audio, StudioService } from '../-player';
import { Router } from '@angular/router';
import 'rxjs/add/observable/interval';
import { DialogPopupComponent } from '../../-shared';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'player-panel',
    templateUrl: 'player-panel.component.html',
    styleUrls: ['player-panel.component.css']
})
export class PlayerPanelComponent {
    @Input() public open: boolean = false;
    public duration: number = 0;
    public current: number = 0;
    public paused: boolean = true;
    public buffers: Array<[number, number]> = [];
    public percent: string = '0%';
    constructor(
        public studio: StudioService,
        private router: Router,
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
        let curr = this.router.url;
        this.router.navigateByUrl(this.router.url.replace(/\(studio\:[0-9a-zA-Z\/]+\)/, '(studio:studio/lyric)'));
    }
    public closeDown() {
        let curr = this.router.url;
        this.router.navigateByUrl(this.router.url.replace(/\(studio\:[0-9a-zA-Z\/]+\)/, '(studio:studio)'));
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
}
