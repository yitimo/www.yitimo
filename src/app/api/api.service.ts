import { Injectable } from '@angular/core';
import { WeiboService } from '../-core/services/weibo.service';

@Injectable()
export class ApiService {
    constructor(
        private weibo: WeiboService
    ) {}
    public Limit(): Promise<any> {
        return this.weibo.ApiLimit();
    }
}
