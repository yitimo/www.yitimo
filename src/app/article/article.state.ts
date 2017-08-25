import { Injectable } from '@angular/core';
import { Http } from '../-core';
import { DialogPopupComponent } from '../-shared';
import { MdDialog } from '@angular/material';

@Injectable()
export class ArticleService {
    private sources: any[]; // 数据源 必须为列表 也就是只考虑复数
    private chosen: number; // 选中的数据项
    private _picked: number[]; // 复选的数据项
    constructor(
        private http: Http,
        private dialog: MdDialog
    ) {
        this.sources = [];
        this.chosen = -1;
        this._picked = [];
        this.FRESH();
    }
    public FRESH() {
        /**
         * 优先获取当前寿命周期缓存
         * 缓存消失(服务被回收)则获取本地存储
         * 存储消失(或超时)则进行请求
         */
        this.http.get('/assets/articles/list.json').then((res) => {
            this.sources = res;
        }).catch((err) => {
            let dialog = this.dialog.open(DialogPopupComponent, {data: {msg: err}});
        });
    }
    public LIST() {
        return this.sources;
    }
    public DETAIL() {
        return this.chosen === -1 ? null : this.sources[this.chosen];
    }
    public CHOOSE(index: number) {
        this.chosen = index;
    }
}
