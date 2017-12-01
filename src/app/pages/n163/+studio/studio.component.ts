import { Component, OnInit } from '@angular/core';
import { StudioService } from '../+player';

/**
 * 1. 展示播放列表
 * 2. 控制当前播放的歌曲
 * 3. 关闭状态小窗口停留在侧边
 * 4. 打开状态覆盖全屏幕
 */

@Component({
    selector: 'studio',
    templateUrl: 'studio.component.html',
    styleUrls: ['studio.component.css']
})
export class StudioComponent implements OnInit {
    constructor(
        private studio: StudioService
    ) {
        //
    }

    public ngOnInit() {
        //
    }
}
