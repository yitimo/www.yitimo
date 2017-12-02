import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {
    MatSidenavModule, MatButtonModule, MatMenuModule,
    MatToolbarModule, MatDialogModule, MatGridListModule,
    MatIconModule, MatProgressBarModule, MatTooltipModule,
    MatRadioModule, MatInputModule, MatChipsModule, MatListModule
} from '@angular/material';
import { DialogPopupComponent } from './popup/dialog.component';
import { YTBPullDirective } from './ytb-pull/ytb-pull.component';
import { YTBRichPipe } from './pipes/rich.pipe';
import { CopyDirective }from './ytb-copy.directive';
import { MinutePipe } from './pipes/minute.pipe';
import { LyricPanelComponent } from './lyric-panel/lyric-panel.component';
import { PlayerPanelComponent } from './player-panel/player-panel.component';

@NgModule({
    declarations: [
        DialogPopupComponent, YTBPullDirective,
        YTBRichPipe,
        CopyDirective,
        MinutePipe,
        LyricPanelComponent,
        PlayerPanelComponent
    ],
    imports: [ CommonModule, MatSidenavModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatDialogModule,
        MatGridListModule, MatIconModule, MatProgressBarModule, MatTooltipModule ],
    exports: [
        CommonModule, MatSidenavModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatDialogModule,
        MatGridListModule, MatIconModule, MatProgressBarModule, MatTooltipModule, YTBPullDirective,
        YTBRichPipe, FormsModule, MatRadioModule, MatChipsModule, MatListModule,
        CopyDirective, MatInputModule, MinutePipe,
        LyricPanelComponent,
        PlayerPanelComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [DialogPopupComponent]
})
export class SharedModule {}
