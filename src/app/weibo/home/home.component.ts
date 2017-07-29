import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { DialogPopupComponent, ytmFly } from '../../-shared';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html',
  animations: [ytmFly]
})
export class HomeComponent implements OnInit {
  public topTip: boolean;
  public bottomTip: boolean;
  constructor(
    public home: HomeService,
    public dialog: MdDialog
  ) {}
  public ngOnInit() {
    this.topTip = false;
    this.bottomTip = false;
    this.home.Latest().catch((err) => {
      let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: err}});
    });
  }
  public pulling(e: {action: string, scroll: number}) {
    this.topTip = this.bottomTip = false;
  }
  public pulled(e) {
    if (e === 'up') {
      this.topTip = true;
    } else if (e === 'down') {
      this.bottomTip = true;
    }
  }
}
