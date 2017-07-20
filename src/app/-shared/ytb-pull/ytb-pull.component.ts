import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
/**
 * 下拉刷新组件
 * 监听上下拉
 * 只有触顶以及触底后才有效
 */
@Component({
    selector: 'ytb-pull',
    template: `
        <div>下拉</div>
        <ng-content></ng-content>
        <div>上拉</div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`
        :host{
            height: 100%;overflow: auto;
        }
    `]
})
export class YTBPullComponent implements OnInit {
    constructor() {
        //
    }

    public ngOnInit() {
        //
    }

    @HostListener('wheel') public onWheel(e) {
        console.log('wheeled!');
    }
    @HostListener('touchstart') public onTouchStart(e) {
        console.log('touchstart!');
    }
    @HostListener('touchend') public onTouchEnd(e) {
        console.log('touchend!');
    }
}
