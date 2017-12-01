import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    // tslint:disable-next-line:pipe-naming
    name: 'minute'
})
export class MinutePipe implements PipeTransform {
    public transform(value: number): string {
        if (typeof value !== 'number') {
            return ' ';
        }
        let sec: any = value % 60;
        let min: any = (value - sec) / 60;
        if (sec < 10) {
            sec = '0' + sec;
        }
        if (min < 10) {
            min = '0' + min;
        }
        return min + ':' + sec;
    }
}
