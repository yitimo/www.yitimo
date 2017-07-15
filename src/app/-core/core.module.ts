import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { WeiboService } from './services/weibo.service';

@NgModule({
    declarations: [],
    imports: [ CommonModule, FormsModule, HttpModule, JsonpModule ],
    exports: [],
    providers: [ WeiboService ],
})
export class CoreModule {}
