import { Injectable } from '@angular/core';
import { WeiboService, TimeLineOptions } from '../../-core';

@Injectable()
export class PublicService {
private page: number;
    // 缓存的微博列表 获取新微博时插入到这里
    private list: any[];
    private option: TimeLineOptions;
    private getting: boolean;
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
        this.page = 1;
        this.list = [];
    }
    public List() {
        return this.list;
    }
    public Page() {
        return this.page;
    }
    public Freshing() {
        return this.getting;
    }
    // 刷新数据，获取更新的十条微博
    public Fresh(): Promise<any[]> {
        this.getting = true;
        this.page = 1;
        this.option = {
            since_id: 0,
            max_id: 0,
            page: this.page,
            count: 10,
            feature: 0
        };
        return this.weibo.PublicTimeLine(this.option).then((res: any[]) => {
            this.list = res.concat(this.list);
            this.getting = false;
            return res;
        }).catch((err) => {
            this.getting = false;
            console.log(err);
            return [];
        });
    }
    // 刷新数据，获取更旧的十条微博
    public Fetch(): Promise<any[]> {
        this.getting = true;
        this.page++;
        this.option = {
            since_id: 0,
            max_id: 0,
            page: this.page,
            count: 10,
            feature: 0
        };
        return this.weibo.PublicTimeLine(this.option).then((res: any[]) => {
            this.list = this.list.concat(res);
            this.getting = false;
            return res;
        }).catch((err) => {
            this.getting = false;
            console.log(err);
            return [];
        });
    }
    // 返回list的最前面十条微博
    public Latest(): Promise<any[]> {
        if (this.list.length) {
            return new Promise((resolve) => {
                this.page = 1;
                resolve(this.list.slice(0, 10));
            });
        } else {
            return this.Fresh();
        }
    }
    // 如果已有列表中没有再新的数据了就请求API获取
    public Newer(): Promise<any[]> {
        if (this.page === 1) {
            return this.Fresh();
        } else {
            return new Promise((resolve) => {
                resolve(this.list.slice(--this.page, 10));
            });
        }
    }
    // 如果已有列表中没有再旧的数据了就请求API获取
    public Older(): Promise<any[]> {
        if (!((this.page + 1) * 10 < this.list.length)) { // 当前页码对应的最大的索引值
            return this.Fetch();
        } else {
            return new Promise((resolve) => {
                resolve(this.list.slice(++this.page, 10));
            });
        }
    }
}
