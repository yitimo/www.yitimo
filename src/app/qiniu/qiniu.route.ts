import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { QiniuComponent } from './qiniu.component';
import { ImagesComponent } from './images';
import { UploadComponent } from './upload';

const routes: Routes = [
    {
        path: 'qiniu',
        component: QiniuComponent,
        children: [
            { path: '', component: ImagesComponent },
            { path: 'images', component: ImagesComponent },
            { path: 'upload', component: UploadComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QiniuRoutingModule {}
