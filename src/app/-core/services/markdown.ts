import { Injectable } from '@angular/core';
// tslint:disable-next-line:no-var-requires
const HyperDown = require('hyperdown');

@Injectable()
export class MarkDownService {
    private hyperDown: any;
    constructor() {
        this.hyperDown = new HyperDown();
    }
    public Html(content: string) {
        return this.hyperDown.makeHtml(content || '');
    }
}
