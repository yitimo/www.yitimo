import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { DialogPopupComponent } from '../../-shared';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
    public $limit: Promise<any>;
    public limit: string;
    constructor(
        private api: ApiService,
        public dialog: MdDialog
    ) {}

    public ngOnInit() {
        this.$limit = this.api.Limit().then((res) => {
            this.limit = JSON.stringify(res);
            return res;
        }).catch((err) => {
            let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: err}});
            return {};
        });
    }
}
