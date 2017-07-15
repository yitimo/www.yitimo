import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeiboService } from './services/weibo.service';

@NgModule({
    declarations: [],
    imports: [ CommonModule ],
    exports: [],
    providers: [ WeiboService ],
})
export class CoreModule {}
