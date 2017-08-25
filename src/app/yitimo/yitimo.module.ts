import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../-shared';
import { YitimoRoutingModule } from './yitimo.route';
import { YitimoService } from './yitimo.service';
import { YitimoComponent } from './yitimo.component';
import { ArticlesComponent } from './articles';
import { ArticlesService } from './articles.state';
import { DetailComponent } from './detail';

@NgModule({
    declarations: [YitimoComponent, ArticlesComponent, DetailComponent],
    imports: [ CommonModule, SharedModule, YitimoRoutingModule ],
    exports: [],
    providers: [YitimoService, ArticlesService],
})
export class YitimoModule {}
