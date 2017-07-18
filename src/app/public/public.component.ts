import { Component, OnInit } from '@angular/core';
import { PublicService } from './public.service';
import { DialogPopupComponent } from '../-shared';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
    public $list: Promise<any>;
  constructor(
    private _public: PublicService,
    public dialog: MdDialog
  ) {}
  public ngOnInit() {
    this.$list = this._public.Latest().catch((err) => {
      let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: err}});
      return [];
    });
  }
}
