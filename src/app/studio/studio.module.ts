import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioComponent } from './studio.component';
import { StudioRoutingModule } from './studio.route';
import { SharedModule } from '../-shared';
import { ListComponent } from './list';
import { LyricComponent } from './lyric';
import { LyricPanelComponent } from './+lyric-panel/lyric-panel.component';
import { PlayerPanelComponent } from './+player-panel/player-panel.component';
import { StudioService, NetService, StudioRouteService } from './-player';

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
        StudioService, NetService, StudioRouteService
    ],
})
export class StudioModule {}
