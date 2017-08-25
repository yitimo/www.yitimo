import { Injectable } from '@angular/core';
import { Yttp } from '../-core';
import { DialogPopupComponent } from '../-shared';
import { MdDialog } from '@angular/material';

@Injectable()
export class ArticlesService {
    private sources: any[]; // 数据源 必须为列表 也就是只考虑复数
    private chosen: number; // 选中的数据项
    private _picked: number[]; // 复选的数据项
    constructor(
        private http: Yttp,
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
        this.sources = [{id: 1, name: '啊'},
        {id: 2, name: '啊啊'},
        {id: 3, name: '啊啊啊'},
        {id: 4, name: '啊啊啊啊'},
        {id: 5, name: '啊啊啊啊啊'},
        {id: 6, name: '啊啊啊啊啊啊'},
        {id: 7, name: '啊啊啊啊啊啊啊'}];
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
