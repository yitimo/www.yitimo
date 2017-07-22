import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
/**
 * 下拉刷新组件
 * 监听上下拉
 * 只有触顶以及触底后才有效
 */
@Directive({
    selector: '[ytb-pull]'
})
export class YTBPullDirective {
    @Output() public ytbPulling = new EventEmitter<{action: string, scroll: number}>();
    @Output() public ytbWheeling = new EventEmitter<{action: string, scroll: number}>();
    @Output() public ytbWheel = new EventEmitter<string>();
    @Output() public ytbPull = new EventEmitter<string>();
    private action: string;
    private scroll: number;
    private prevPageY: number;
    private prevWheel: number;
    private canWheel: boolean;
    constructor(
        private elem: ElementRef
    ) {
        this.prevWheel = 0;
        this.scroll = 0;
        this.prevPageY = 0;
        this.canWheel = true;
        this.elem.nativeElement.style.overflow = 'auto';
        this.elem.nativeElement.style.height = '100%';
    }
    @HostListener('wheel') public onWheel() {
        let top = this.elem.nativeElement.scrollTop;
        if (this.prevWheel > top) {
            // 向上滚
            this.ytbWheeling.emit({action: 'down', scroll: this.prevWheel - top});
            this.canWheel = true;
            this.prevWheel = top;
        } else if (this.prevWheel < top) {
            // 向下滚
            this.ytbWheeling.emit({action: 'up', scroll: this.prevWheel - top});
            this.canWheel = true;
            this.prevWheel = top;
        } else {
            // 触顶或底还坚持滚
            if (this.canWheel) {
                this.ytbWheel.emit(top === 0 ? 'up' : 'down');
            }
            this.canWheel = false;
        }
    }
    @HostListener('touchstart') public onTouchStart() {
        this.scroll = 0;
        this.prevPageY = 0;
        let top = this.elem.nativeElement.scrollTop;
        let bottom = this.elem.nativeElement.scrollHeight - this.elem.nativeElement.offsetHeight - top;
        if (top === 0) {
            this.action = 'up';
        } else if (bottom === 0) {
            this.action = 'down';
        }
    }
    @HostListener('touchend') public onTouchEnd() {
        if (this.action === 'up') {
            if (this.scroll > 0) {
                this.ytbPull.emit('up');
            }
        } else if (this.action === 'down') {
            if (this.scroll < 0) {
                this.ytbPull.emit('down');
            }
        }
        this.scroll = 0;
        this.prevPageY = 0;
        this.action = 'none';
    }
    @HostListener('touchmove', ['$event.touches']) public onTouch(touches: TouchList) {
        if (this.action !== 'none') {
            if (this.prevPageY) {
                this.scroll += touches[0].pageY - this.prevPageY;
                this.ytbPulling.emit({action: this.action, scroll: touches[0].pageY - this.prevPageY});
            }
            this.prevPageY = touches[0].pageY;
        }
    }
}
