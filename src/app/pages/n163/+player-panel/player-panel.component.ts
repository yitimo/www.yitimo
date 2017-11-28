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
        });
    }
    public skip($event: MouseEvent) {
        let pDom = document.getElementsByClassName('audio-duration')[0];
        this.audioRef.skip(($event.clientX -
            pDom.getBoundingClientRect().left) / pDom.clientWidth);
    }
}
