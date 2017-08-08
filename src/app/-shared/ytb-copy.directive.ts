import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { DialogPopupComponent } from './popup/dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';

@Directive({
    selector: '[ytbCopy]',
})
export class CopyDirective {
    @Input() public ytbCopy: string;
    constructor(
        public dialog: MdDialog
    ) {}
    @HostListener('mouseup') public mouseUp() {
        let board: any = window.document.querySelector(`#${this.ytbCopy}`);
        if (!board.value.length) {
            this.nothing();
        } else {
            if (board.select) {
                board.select();
                try {
                    window.document.execCommand('copy');
                    this.copied();
                } catch (e) {
                    console.log(e);
                    this.failed();
                }
            } else {
                this.failed();
            }
        }
    }
    private copied() {
        let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: '已复制到剪贴板'}});
    }
    private failed() {
        let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: '请手动进行复制'}});
    }
    private nothing() {
        let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: '没有内容！'}});
    }
}
