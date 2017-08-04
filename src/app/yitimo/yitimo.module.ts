import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../-shared';
import { YitimoRoutingModule } from './yitimo.route';
import { YitimoService } from './yitimo.service';
import { YitimoComponent } from './yitimo.component';

@NgModule({
    declarations: [YitimoComponent],
    imports: [ CommonModule, SharedModule, YitimoRoutingModule ],
    exports: [],
    providers: [YitimoService],
})
export class YitimoModule {}
