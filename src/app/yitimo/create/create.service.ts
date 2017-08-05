import { Injectable } from '@angular/core';
// tslint:disable-next-line:no-var-requires
const HyperDown = require('hyperdown');

@Injectable()
export class CreateService {
    private hyperDown;
    constructor() {
        this.hyperDown = new HyperDown();
    }
    public Markdown(content: string) {
        return this.hyperDown.makeHtml(content || '');
    }
}
