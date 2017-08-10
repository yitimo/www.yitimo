import { Injectable } from '@angular/core';
import { YitimoService } from '../yitimo.service';

@Injectable()
export class ArticlesService {
    private loading: boolean;
    private error: boolean;
    private articles: any[];
    constructor(
        private yitimo: YitimoService
    ) {
        this.loading = this.error = false;
        this.articles = [];
    }
    public Loading() {
        return this.loading;
    }
    public Error() {
        return this.error;
    }
    public Articles() {
        return this.error ? [] : this.articles;
    }
    public Init(): Promise<any> {
        this.loading = true;
        return this.yitimo.Articles(0).then((res) => {
            this.articles = res;
            this.error = res._error;
            this.loading = false;
        });
    }
}
