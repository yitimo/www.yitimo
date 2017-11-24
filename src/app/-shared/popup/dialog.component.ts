import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    template: `
        <h2 mat-dialog-title  *ngIf="data.title">{{data.title}}</h2>
        <mat-dialog-content>{{data.msg || ' '}}</mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button *ngIf="data.ok" [mat-dialog-close]="true">{{data.ok}}</button>
            <button mat-button *ngIf="data.no" mat-dialog-close>{{data.no}}</button>
        </mat-dialog-actions>
    `
})
export class DialogPopupComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
}
