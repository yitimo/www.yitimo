import { NgModule } from '@angular/core';
import { SharedModule } from '../../-shared';
import { StudioService } from './studio.service';
import { StudioComponent } from './studio.component';
import { StudioRoutingModule } from './studio.route';
import { EditComponent } from './edit';
import { ListComponent } from './list';
import { AppComponent } from './app';
import { PianoComponent } from './+piano/piano.component';
import { ToneMatrixComponent  } from './+matrix/matrix.component';

@NgModule({
    declarations: [
        StudioComponent,
        EditComponent,
        ListComponent,
        AppComponent,
        PianoComponent,
        ToneMatrixComponent
    ],
    imports: [ SharedModule, StudioRoutingModule ],
    exports: [],
    providers: [
        StudioService
    ],
})
export class StudioModule {}
