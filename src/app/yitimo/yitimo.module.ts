import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YitimoRoutingModule } from './yitimo.route';
import { YitimoComponent } from './yitimo.component';

@NgModule({
    declarations: [YitimoComponent],
    imports: [ CommonModule, YitimoRoutingModule ],
    exports: [],
    providers: [],
})
export class YitimoModule {}
