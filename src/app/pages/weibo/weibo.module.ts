import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../-shared';
import { WeiboRoutingModule } from './weibo.route';
import { WeiboService } from './weibo.service';
import { WeiboComponent } from './weibo.component';
import { StatusesComponent } from './statuses/statuses.component';
import { StatusComponent } from './status/status.component';
import { CreateComponent } from './create/create.component';

import { StatusCardComponent } from './+status-card/status-card.component';
import { StatusImgComponent } from './+status-card/simg/status-img.component';
import { StatusTextComponent } from './+status-card/text/status-text.component';
import { StatusRetweetedComponent } from './+status-card/retweeted/status-retweeted.component';
import { StatusUserComponent } from './+status-card/user/status-user.component';
import { SSexPipe } from './+status-card/user/ssex.pipe';
import { SatPipe, SlinkPipe, StopicPipe, StatusPipe } from './+status-card/text/text.pipe';

@NgModule({
    declarations: [
        StatusCardComponent, StatusImgComponent,
        StatusTextComponent, StatusRetweetedComponent, StatusUserComponent,
        SatPipe, SlinkPipe, StopicPipe, StatusPipe,
        SSexPipe, WeiboComponent, StatusesComponent, StatusComponent, CreateComponent],
    imports: [ CommonModule, SharedModule, WeiboRoutingModule ],
    exports: [],
    providers: [WeiboService],
})
export class WeiboModule {}
