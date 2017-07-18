import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    template: `
        <h2 md-dialog-title  *ngIf="data.title">{{data.title}}</h2>
        <md-dialog-content>{{data.msg || ' '}}</md-dialog-content>
        <md-dialog-actions>
            <button md-button *ngIf="data.ok" [md-dialog-close]="true">{{data.ok}}</button>
            <button md-button *ngIf="data.no" md-dialog-close>{{data.no}}</button>
        </md-dialog-actions>
    `
})
export class DialogPopupComponent {
    constructor(
        public dialogRef: MdDialogRef<DialogPopupComponent>,
        @Inject(MD_DIALOG_DATA) public data: any
    ) {}
}
