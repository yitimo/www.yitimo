import { Injectable } from '@angular/core';
import * as HyperDown from 'hyperdown';

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
