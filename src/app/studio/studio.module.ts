import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioService } from './studio.service';
import { StudioComponent } from './studio.component';
import { StudioRoutingModule } from './studio.route';
import { SharedModule } from '../-shared';
import { HomeComponent } from './home';
import { LyricComponent } from './lyric';

@NgModule({
    declarations: [
        StudioComponent,
        HomeComponent,
        LyricComponent
    ],
    imports: [ SharedModule, StudioRoutingModule ],
    exports: [],
    providers: [
        StudioService
    ],
})
export class StudioModule {}
