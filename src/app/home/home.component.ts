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
  constructor(
    private weibo: WeiboService
  ) {}
  public ngOnInit() {
    this.weibo.HomeTimeLine();
  }
}
