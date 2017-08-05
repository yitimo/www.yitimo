import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { CreateService } from './create.service';

@Component({
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    public $preview: Observable<string>;
    private articleStream = new Subject<string>();
    constructor(
        private create: CreateService
    ) {
        //
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
