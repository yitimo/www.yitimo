import {
  Component,
  OnInit
} from '@angular/core';
import { HomeService } from './home.service';
import { DialogPopupComponent, ytmFly } from '../-shared';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html',
  animations: [ytmFly]
})
export class HomeComponent implements OnInit {
  public $list: Promise<any>;
  public topTip: boolean;
  public bottomTip: boolean;
  constructor(
    private home: HomeService,
    public dialog: MdDialog
  ) {}
  public ngOnInit() {
    this.topTip = false;
    this.bottomTip = false;
    this.$list = this.home.Latest().catch((err) => {
      let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: err}});
      return [];
    });
  }
  public pulling(e: {action: string, scroll: number}) {
    if (e.action === 'up' && e.scroll < 0) {
      this.topTip = false;
      return;
    }
    if (e.action === 'down' && e.scroll > 0) {
      this.bottomTip = false;
      return;
    }
  }
  public pulled(e) {
    if (e === 'up') {
      this.topTip = true;
    } else if (e === 'down') {
      this.bottomTip = true;
    }
  }
}
