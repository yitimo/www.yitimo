import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { MdDialog } from '@angular/material';
import { DialogPopupComponent } from '../../../-shared';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    public words: string;
    public list: any[];
    public page: any;
    public history: string[];
    constructor(
        private search: SearchService,
        private dialog: MdDialog
    ) {
        this.page = {
            count: 0,
            current: 1
        };
        this.list = [];
    }

    public ngOnInit() {
        this.history = this.search.History();
        if (this.search.lastSearch) {
            this.list = this.search.lastSearch.list || [];
            this.page = this.search.lastSearch.page || {current: 1, count: 0};
        }
    }

    public enter($event: KeyboardEvent) {
        if ($event.keyCode === 13 && this.words && this.words.length) {
            this.doSearch(this.words);
        }
    }

    public more() {
        if (this.list.length >= this.page.count) {
            return;
        }
        this.search.Search(this.history[0], this.page.current + 1).subscribe((res) => {
            this.list = this.list.concat(res.songs || []);
            this.page = {count: res.songCount, current: this.page.current + 1};
            this.search.lastSearch = {list: this.list, page: this.page};
        }, (err) => {
            this.dialog.open(DialogPopupComponent, {data: {msg: err}});
            console.log(err);
        });
    }

    public doSearch(words: string) {
        this.words = words;
        this.search.Search(words, 1).subscribe((res) => {
            this.list = res.songs || [];
            this.page = {count: res.songCount, current: 1};
            this.history = this.search.History();
            this.search.lastSearch = {list: this.list, page: this.page};
        }, (err) => {
            this.dialog.open(DialogPopupComponent, {data: {msg: err}});
            console.log(err);
        });
    }
}
