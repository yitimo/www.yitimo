import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Audio, StudioService } from '../../-core';
import 'rxjs/add/observable/interval';

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
        private studio: StudioService
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
    public toggle() {
        this.studio.Toggle(this.studio.CurrentId());
    }
    public abort() {
        this.studio.Abort();
    }
}
