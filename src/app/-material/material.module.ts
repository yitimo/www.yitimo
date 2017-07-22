import { NgModule } from '@angular/core';
import {
  MdSidenavModule, MdButtonModule, MdMenuModule,
  MdToolbarModule, MdDialogModule, MdGridListModule,
  MdIconModule, MdProgressBarModule
} from '@angular/material';

@NgModule({
  exports: [MdSidenavModule, MdButtonModule, MdMenuModule, MdToolbarModule, MdDialogModule,
  MdGridListModule, MdIconModule, MdProgressBarModule]
})
export class MaterialModule {}
