import { NgModule } from '@angular/core';
import { SharedModule } from '../-shared';
import { DefaultComponent } from './default';
import { PutsangtoService } from './putsangto.service';
import { PutsangtoComponent } from './putsangto.component';
import { PutsangtoRoutingModule } from './putsangto.route';
import { CreativeComponent } from './creative';
import { PmComponent, PmService } from './pm';

@NgModule({
    declarations: [
        PutsangtoComponent,
        CreativeComponent,
        PmComponent
    ],
    imports: [ SharedModule, PutsangtoRoutingModule ],
    exports: [],
    providers: [
        PutsangtoService,
        PmService
    ],
})
export class PutsangtoModule {}
