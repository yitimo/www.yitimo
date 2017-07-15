import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
      <md-toolbar color="accent">
        <span>
          Yitibo!
        </span>
        <span class="ytb-fill-remaining-space"></span>
        <ytb-userbar></ytb-userbar>
      </md-toolbar>
      <router-outlet></router-outlet>
  `,
  styles: [`
    .ytb-appbody {
      height: 100%;
    }
    .ytb-fill-remaining-space{
      flex: 1 1 auto;
    }
  `]
})
export class AppComponent {}
