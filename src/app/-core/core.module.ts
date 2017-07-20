import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { WeiboService } from './services/weibo.service';
import { OAuthGuard } from './guards/oauth.guard';

@NgModule({
    declarations: [],
    imports: [ CommonModule, FormsModule, HttpModule ],
    exports: [],
    providers: [ WeiboService, OAuthGuard ],
})
export class CoreModule {}
