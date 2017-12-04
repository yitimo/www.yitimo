import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioService } from './studio.service';
import { StudioComponent } from './studio.component';
import { StudioRoutingModule } from './studio.route';
import { SharedModule } from '../-shared';
import { ListComponent } from './list';
import { LyricComponent } from './lyric';
import { LyricPanelComponent } from './+lyric-panel/lyric-panel.component';
import { PlayerPanelComponent } from './+player-panel/player-panel.component';

@NgModule({
    declarations: [
        StudioComponent,
        ListComponent,
        LyricComponent,
        LyricPanelComponent,
        PlayerPanelComponent
    ],
    imports: [ SharedModule, StudioRoutingModule ],
    exports: [],
    providers: [
        StudioService
    ],
})
export class StudioModule {}
