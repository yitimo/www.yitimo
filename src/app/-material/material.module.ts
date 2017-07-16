import { NgModule } from '@angular/core';
import {
  MdSidenavModule, MdButtonModule, MdMenuModule,
  MdToolbarModule, MdDialogModule, MdGridListModule
} from '@angular/material';

@NgModule({
  exports: [MdSidenavModule, MdButtonModule, MdMenuModule, MdToolbarModule, MdDialogModule,
  MdGridListModule]
})
export class MaterialModule {}
