import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'user',
    templateUrl: './status-user.component.html',
    styleUrls: ['./status-user.component.css']
})
export class StatusUserComponent {
    @Input() public data: any;
}
