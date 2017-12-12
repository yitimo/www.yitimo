import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Putsangto2Service } from './putsangto2.service';
import { Putsangto2Component } from './putsangto2.component';
import { Putsangto2RoutingModule } from './putsangto2.route';
import { DemoComponent } from './demo';

@NgModule({
    declarations: [
        Putsangto2Component,
        DemoComponent
    ],
    imports: [ CommonModule, Putsangto2RoutingModule ],
    exports: [],
    providers: [
        Putsangto2Service
    ],
})
export class Putsangto2Module {}
