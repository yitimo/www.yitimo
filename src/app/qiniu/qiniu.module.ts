import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../-shared';
import { QiniuComponent } from './qiniu.component';
import { QiniuRoutingModule } from './qiniu.route';
import { ImagesComponent } from './images';
import { UploadComponent } from './upload';

@NgModule({
    declarations: [QiniuComponent, ImagesComponent, UploadComponent],
    imports: [ CommonModule, SharedModule, QiniuRoutingModule ],
    exports: [],
    providers: [],
})
export class QiniuModule {}
