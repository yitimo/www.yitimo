import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Audio } from '../+player';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'player-panel',
    templateUrl: 'player-panel.component.html',
    styleUrls: ['player-panel.component.css']
})
export class PlayerPanelComponent implements OnChanges {
    @Output() public onplay: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onpause: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onabort: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onskip: EventEmitter<number> = new EventEmitter<number>();
    @Input() public duration: number = 0;
    @Input() public current: number = 0;
    @Input() public paused: boolean = true;
    @Input() public buffers: Array<[number, number]> = [];
    public percent: string = '0%';
    public ngOnChanges(changes: SimpleChanges) {
        if (changes.current.previousValue !== changes.current.currentValue) {
            this.percent = (changes.current.currentValue / this.duration * 100).toFixed(2) + '%';
        }
    }
    public skip($event: MouseEvent) {
        let pDom = document.getElementsByClassName('audio-duration')[0];
        this.onskip.emit(this.duration * ($event.clientX -
            pDom.getBoundingClientRect().left) / pDom.clientWidth);
    }
    public toggle() {
        if (this.paused) {
            this.onplay.emit();
        } else {
            this.onpause.emit();
        }
    }
    public abort() {
        this.onabort.emit();
    }
}
