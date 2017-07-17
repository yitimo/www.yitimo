import {
  Component,
  OnInit
} from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public $list: Promise<any>;
  constructor(
    private home: HomeService
  ) {}
  public ngOnInit() {
    this.$list = this.home.Latest().catch((err) => {
      console.log(err);
      return [];
    });
  }
}
