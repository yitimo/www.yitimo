import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../-shared';
import { YitimoRoutingModule } from './yitimo.route';
import { YitimoComponent } from './yitimo.component';

@NgModule({
    declarations: [YitimoComponent],
    imports: [ CommonModule, SharedModule, YitimoRoutingModule ],
    exports: [],
    providers: [],
})
export class YitimoModule {}
