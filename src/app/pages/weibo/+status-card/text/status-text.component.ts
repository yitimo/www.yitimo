import { Component, Input } from '@angular/core';

/**
 * ##包围的视为话题 话题将提到最前面显示
 * @后紧随的视为博主ID 暂时区别颜色 后为跳转到对方主页
 */
@Component({
    selector: 'text',
    templateUrl: './status-text.component.html',
    styleUrls: ['./status-text.component.css']
})
export class StatusTextComponent {
    @Input() public data: any;
}
