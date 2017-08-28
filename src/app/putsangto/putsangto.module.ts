import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default';
import { PutsangtoService } from './putsangto.service';
import { PutsangtoComponent } from './putsangto.component';
import { PutsangtoRoutingModule } from './putsangto.route';
import { CreativeComponent, CreativeService } from './creative';
import { PmComponent, PmService } from './pm';

@NgModule({
    declarations: [
        PutsangtoComponent,
        CreativeComponent,
        PmComponent
    ],
    imports: [ CommonModule, PutsangtoRoutingModule ],
    exports: [],
    providers: [
        PutsangtoService,
        CreativeService,
        PmService
    ],
})
export class PutsangtoModule {}
