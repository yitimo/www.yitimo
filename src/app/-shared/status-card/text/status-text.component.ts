import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'text',
    templateUrl: './status-text.component.html',
    styleUrls: ['./status-text.component.css']
})
export class StatusTextComponent {
    @Input() public data: any;
}
