import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';

/**
 * 富文本渲染管道
 * 直接使用ng2的innerHtml指令会导致除标签外的节点都被移除
 * 需要将富文本内容通过此管道进行转换
 */

// tslint:disable-next-line:pipe-naming
@Pipe({ name: 'yrich'})
export class YTBRichPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  public transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
