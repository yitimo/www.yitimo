import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:no-var-requires
const HyperDown = require('hyperdown');

@Injectable()
export class CreateService {
    private hyperDown;
    constructor() {
        this.hyperDown = new HyperDown();
    }
    public Markdown(content: string) {
        return Observable.create((observer) => {
            observer.next(this.hyperDown.makeHtml(content || ''));
        });
    }
}
