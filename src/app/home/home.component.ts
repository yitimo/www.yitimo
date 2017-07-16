import {
  Component,
  OnInit
} from '@angular/core';
import { WeiboService } from '../-core';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public homeTimeLines;
  constructor(
    private weibo: WeiboService
  ) {}
  public ngOnInit() {
    this.weibo.HomeTimeLine().then((res) => {
      this.homeTimeLines = res;
    }).catch((err) => {
      console.log(err);
    });
  }
}
