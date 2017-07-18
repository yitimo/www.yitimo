import {
  Component,
  OnInit
} from '@angular/core';
import { HomeService } from './home.service';
import { DialogPopupComponent } from '../-shared';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public $list: Promise<any>;
  constructor(
    private home: HomeService,
    public dialog: MdDialog
  ) {}
  public ngOnInit() {
    this.$list = this.home.Latest().catch((err) => {
      let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: err}});
      return [];
    });
  }
}
