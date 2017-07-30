import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../-shared';
import { WeiboRoutingModule } from './weibo.route';
import { WeiboService } from './weibo.service';
import { WeiboComponent } from './weibo.component';
import { StatusesComponent } from './statuses/statuses.component';
import { StatusComponent } from './status/status.component';
import { CreateComponent } from './create/create.component';

@NgModule({
    declarations: [WeiboComponent, StatusesComponent, StatusComponent, CreateComponent],
    imports: [ CommonModule, SharedModule, WeiboRoutingModule ],
    exports: [],
    providers: [WeiboService],
})
export class WeiboModule {}
