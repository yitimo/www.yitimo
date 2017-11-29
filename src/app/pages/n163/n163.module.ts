import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../-shared';
import { N163Service } from './n163.service';
import { N163Component } from './n163.component';
import { N163RoutingModule } from './n163.route';
import { SearchComponent, SearchService } from './search';
import { SongComponent } from './song';
import { InfoComponent } from './info';
import { LyricPanelComponent } from './+lyric-panel/lyric-panel.component';
import { PlayerPanelComponent } from './+player-panel/player-panel.component';

import { StudioService } from './studio';

@NgModule({
    declarations: [
        N163Component,
        SearchComponent,
        SongComponent,
        InfoComponent,
        LyricPanelComponent,
        PlayerPanelComponent
    ],
    imports: [ SharedModule, N163RoutingModule ],
    exports: [],
    providers: [
        N163Service, SearchService,
        StudioService
    ],
})
export class N163Module {}
