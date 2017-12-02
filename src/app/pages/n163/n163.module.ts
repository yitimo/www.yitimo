import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../-shared';
import { N163Component } from './n163.component';
import { N163RoutingModule } from './n163.route';
import { SearchComponent, SearchService } from './search';
import { SongComponent } from './song';
import { InfoComponent } from './info';

@NgModule({
    declarations: [
        N163Component,
        SearchComponent,
        SongComponent,
        InfoComponent
    ],
    imports: [ SharedModule, N163RoutingModule ],
    exports: [],
    providers: [
        SearchService
    ],
})
export class N163Module {}
