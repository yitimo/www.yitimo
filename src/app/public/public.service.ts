import { Injectable } from '@angular/core';
import { WeiboService, TimeLineOptions } from '../-core';

@Injectable()
export class PublicService {
    // 缓存的微博列表 获取新微博时插入到这里
    private list: any[];
    // 缓存当前以获取微博的id范围，值为[最大id, 最小id]
    // 获取新微博时更新id范围，用于帮助数据更新
    private range: number;
    private option: TimeLineOptions;
    constructor(
        private weibo: WeiboService
    ) {
        this.option = {
            since_id: 0,
            max_id: 0,
            page: 1,
            count: 10,
            feature: 0
        };
        this.range = 0;
        this.list = [];
    }
    // 刷新数据，获取更新的十条微博
    public Fresh() {
        this.option = {
            since_id: this.list[0] ? this.list[0].id : 0,
            max_id: 0,
            page: 1,
            count: 10,
            feature: 0
        };
        return this.weibo.PublicTimeLine(this.option).then((res: any[]) => {
            this.list = res.concat(this.list);
            return res;
        });
    }
    // 刷新数据，获取更旧的十条微博
    public Fetch() {
        this.option = {
            since_id: 0,
            max_id: this.list.length ? this.list[this.list.length - 1].id : 0,
            page: 1,
            count: 10,
            feature: 0
        };
        return this.weibo.PublicTimeLine(this.option).then((res: any[]) => {
            this.list = this.list.concat(res);
            return res;
        });
    }
    // 返回list的最前面十条微博
    public Latest(): Promise<any> {
        this.range = 0;
        if (this.list.length) {
            return new Promise((resolve) => {
                resolve(this.list.slice(0, 10));
            });
        } else {
            return this.Fresh();
        }
    }
    // 如果已有列表中没有再新的数据了就请求API获取
    public Newer() {
        if (!this.range) {
            return this.Fresh();
        } else {
            return new Promise((resolve) => {
                resolve(this.list.slice(--this.range, 10));
            });
        }
    }
    // 如果已有列表中没有再旧的数据了就请求API获取
    public Older() {
        if (!((this.range + 1) * 10 < this.list.length)) { // 当前页码对应的最大的索引值
            return this.Fetch();
        } else {
            return new Promise((resolve) => {
                resolve(this.list.slice(++this.range, 10));
            });
        }
    }
}
