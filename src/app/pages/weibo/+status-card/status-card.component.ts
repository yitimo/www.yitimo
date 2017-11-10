import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'status-card',
    templateUrl: './status-card.component.html',
    styleUrls: ['./status-card.component.css']
})
export class StatusCardComponent {
    @Input() public data;
}
