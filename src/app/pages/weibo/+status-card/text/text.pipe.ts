import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const matchUrl = /(?:^|[\W])((ht|f)tp(s?):\/\/|www\.)(([\w\-]+\.){1,}?([\w\-.~]+\/?)*[\p{Alnum}.,%_=?&#\-+()\[\]\*$~@!:/{};']*)/g;
const matchAt = /@[\u4e00-\u9fa5a-zA-Z0-9_-]{2,30}/g;
const matchTopic = /#[^#]+#/g;

// tslint:disable:max-classes-per-file
// tslint:disable:pipe-naming
@Pipe({name: 'sat'})
export class SatPipe implements PipeTransform {
    public transform(value: string): any {
        if (value && value.length) {
            let ats = value.match(matchAt);
            if (ats) {
                ats.forEach((at) => {
                    value = value.replace(at, `<a href="javascript:void(0);" style="color: #eb7397;">${at}</a>`);
                });
            }
        }
        return value;
    }
}

@Pipe({name: 'slink'})
export class SlinkPipe implements PipeTransform {
    public transform(value: string): any {
        if (value && value.length) {
            let ats = value.match(matchUrl);
            if (ats) {
                ats.forEach((at) => {
                    value = value.replace(at.substring(1), `<a href="${at.substring(1)}" target="blank" style="color: #eb7397;">网页链接</a>`);
                });
            }
        }
        return value;
    }
}

@Pipe({name: 'stopic'})
export class StopicPipe implements PipeTransform {
    public transform(value: string): any {
        if (value && value.length) {
            let ats = value.match(matchTopic);
            if (ats) {
                ats.forEach((at) => {
                    value = value.replace(at, `<a href="javascript:void(0);" style="color: #eb7397;">${at}</a>`);
                });
            }
        }
        return value;
    }
}

@Pipe({ name: 'status'})
export class StatusPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  public transform(value: string) {
      if (typeof value === 'string') {
        return this.sanitized.bypassSecurityTrustHtml(value);
      }
  }
}
