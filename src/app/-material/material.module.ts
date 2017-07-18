import { NgModule } from '@angular/core';
import {
  MdSidenavModule, MdButtonModule, MdMenuModule,
  MdToolbarModule, MdDialogModule, MdGridListModule,
  MdIconModule
} from '@angular/material';

@NgModule({
  exports: [MdSidenavModule, MdButtonModule, MdMenuModule, MdToolbarModule, MdDialogModule,
  MdGridListModule, MdIconModule]
})
export class MaterialModule {}
