import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Audio } from '../+player';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'player-panel',
    templateUrl: 'player-panel.component.html',
    styleUrls: ['player-panel.component.css']
})
export class PlayerPanelComponent implements OnInit {
    @Input() public source: string;
    @Output() public onplay: EventEmitter<number> = new EventEmitter<number>();
    public audioRef: Audio;
    public duration: number = 0;
    public current: number = 0;
    public paused: boolean = true;
    public buffers: Array<[number, number]> = [];
    public percent: string = '0%';
    constructor() {
        this.audioRef = null;
    }
    public ngOnInit() {
        this.audioRef = new Audio(this.source);
        this.audioRef.listen(1000).subscribe((res) => {
            this.duration = res.duration;
            this.current = res.current;
            this.buffers = res.buffers;
            this.paused = res.paused;
            this.percent = (res.current / res.duration * 100).toFixed(2) + '%';
            this.onplay.emit(this.current);
        });
    }
    public skip($event: MouseEvent) {
        let pDom = document.getElementsByClassName('audio-duration')[0];
        let skip = this.audioRef.skip(($event.clientX -
            pDom.getBoundingClientRect().left) / pDom.clientWidth);
        this.duration = skip.duration;
        this.current = skip.current;
        this.buffers = skip.buffers;
        this.paused = skip.paused;
        this.percent = (skip.current / skip.duration * 100).toFixed(2) + '%';
        this.onplay.emit(this.current);
    }
}
