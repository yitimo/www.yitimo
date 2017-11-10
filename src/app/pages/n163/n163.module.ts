import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default';
import { N163Service } from './n163.service';
import { N163Component } from './n163.component';
import { N163RoutingModule } from './n163.route';
import { SearchComponent } from './search';
import { SongComponent } from './song';
import { InfoComponent } from './info';

@NgModule({
    declarations: [
        N163Component,
        SearchComponent,
        SongComponent,
        InfoComponent
    ],
    imports: [ CommonModule, N163RoutingModule ],
    exports: [],
    providers: [
        N163Service
    ],
})
export class N163Module {}
