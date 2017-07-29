import { NgModule } from '@angular/core';
import {
  MdSidenavModule, MdButtonModule, MdMenuModule,
  MdToolbarModule, MdDialogModule, MdGridListModule,
  MdIconModule, MdProgressBarModule, MdTooltipModule
} from '@angular/material';

@NgModule({
  exports: [MdSidenavModule, MdButtonModule, MdMenuModule, MdToolbarModule, MdDialogModule,
  MdGridListModule, MdIconModule, MdProgressBarModule, MdTooltipModule]
})
export class MaterialModule {}
