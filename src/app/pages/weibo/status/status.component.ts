import { Component, OnInit } from '@angular/core';
import { DialogPopupComponent } from '../../../-shared';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
    public $limit: Promise<any>;
    public limit: string;
    constructor(
        public dialog: MatDialog
    ) {}

    public ngOnInit() {
        //
    }
}
