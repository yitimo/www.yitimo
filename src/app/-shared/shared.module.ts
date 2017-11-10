import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {
    MdSidenavModule, MdButtonModule, MdMenuModule,
    MdToolbarModule, MdDialogModule, MdGridListModule,
    MdIconModule, MdProgressBarModule, MdTooltipModule,
    MdRadioModule
} from '@angular/material';
import { DialogPopupComponent } from './popup/dialog.component';
import { YTBPullDirective } from './ytb-pull/ytb-pull.component';
import { YTBRichPipe } from './pipes/rich.pipe';
import { CopyDirective }from './ytb-copy.directive';

@NgModule({
    declarations: [
        DialogPopupComponent, YTBPullDirective,
        YTBRichPipe,
        CopyDirective
    ],
    imports: [ CommonModule, MdSidenavModule, MdButtonModule, MdMenuModule, MdToolbarModule, MdDialogModule,
        MdGridListModule, MdIconModule, MdProgressBarModule, MdTooltipModule ],
    exports: [
        CommonModule, MdSidenavModule, MdButtonModule, MdMenuModule, MdToolbarModule, MdDialogModule,
        MdGridListModule, MdIconModule, MdProgressBarModule, MdTooltipModule, YTBPullDirective,
        YTBRichPipe, FormsModule, MdRadioModule,
        CopyDirective
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
