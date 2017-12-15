import { Injectable } from '@angular/core';
import { StorageService } from '../../../-core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SearchComponent } from './search.component';

@Injectable()
export class SearchService {
    /**
     * 代执行搜索功能 并缓存历史搜索
     * 其中缓存本次生命周期内
     *     最近一次搜索的全部结果 数据/页码
     * 本地缓存所有搜索记录除非手动删除(独立)
     */
    public lastSearch: any;
    private pageSize = 10;
    private searchHistory: string[];
    constructor(
        private storage: StorageService,
        private http: HttpClient
    ) {
        this.lastSearch = null;
        this.searchHistory = this.storage.Get('163-search-history') || [];
    }
    public History() {
        return this.searchHistory;
    }
    public Search(words: string, page: number): Observable<any> {
        this.mergeHistory(words);
        return this.http.get(`https://api.163.yitimo.com/search/${words}/${page}/${this.pageSize}`).map((res) => {
            return res;
        });
    }
    private mergeHistory(newWords: string) {
        let find = this.searchHistory.indexOf(newWords);
        if (find > 0) {
            this.searchHistory.splice(find, 1);
            this.searchHistory.unshift(newWords);
        } else if (find === 0) {
            //
        } else {
            this.searchHistory.unshift(newWords);
        }
        if (this.searchHistory.length > 5) {
            this.searchHistory.splice(0, 5);
        }
        this.storage.Set('163-search-history', this.searchHistory);
    }
}
