import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { N163Service } from '../n163.service';
import { DialogPopupComponent } from '../../../-shared';

@Component({
    selector: 'info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    public song: any;
    constructor(
        private aRoute: ActivatedRoute,
        private n163: N163Service,
        private dialog: MatDialog
    ) {
        //
    }

    public ngOnInit() {
        this.n163.Info(this.aRoute.snapshot.params['id']).subscribe((res) => {
            this.song = res[0];
        }, (err) => {
            this.dialog.open(DialogPopupComponent, {data: {msg: err}});
        });
    }
}
