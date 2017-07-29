import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeiboRoutingModule } from './weibo.route';
import { WeiboComponent } from './weibo.component';
import { ApiComponent } from './api/api.component';
import { HomeComponent, HomeService } from './home';
import { PublicComponent, PublicService } from './public';

@NgModule({
    declarations: [ApiComponent, WeiboComponent, HomeComponent, PublicComponent],
    imports: [ CommonModule, WeiboRoutingModule ],
    exports: [],
    providers: [HomeService, PublicService],
})
export class WeiboModule {}
