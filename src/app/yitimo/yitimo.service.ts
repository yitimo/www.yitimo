import { Injectable } from '@angular/core';
import { Yttp } from '../-core';

@Injectable()
export class YitimoService {
    constructor(
        private yttp: Yttp
    ) {}
    public Articles(): Promise<any> {
        return this.yttp.get(`/assets/articles/list.json`)
            .catch((err) => {
                console.log(`【获取文章列表】【${err}】`);
                return {_error: true};
            });
    }
}
