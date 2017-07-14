import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeiboRoutingModule } from './weibo.routes';
import { OAuthComponent } from './oauth/oauth.component';
import { RedirectComponent } from './redirect/redirect.component';
import { IndexComponent } from './index/index.component';

@NgModule({
    declarations: [IndexComponent, OAuthComponent, RedirectComponent],
    imports: [ CommonModule, WeiboRoutingModule ],
    exports: [],
    providers: []
})
export class WeiboModule {}
