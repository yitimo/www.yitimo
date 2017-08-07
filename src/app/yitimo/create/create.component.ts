import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { CreateService } from './create.service';

@Component({
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {
    public $preview: Observable<string>;
    public previewing: boolean;
    private articleStream = new Subject<string>();
    constructor(
        private create: CreateService
    ) {
        this.previewing = false;
    }
    public ngOnInit() {
        this.$preview = this.articleStream
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap((value) => this.create.Markdown(value));
    }
    public input(value) {
        this.articleStream.next(value);
    }
}
