import { NgModule } from '@angular/core';
import { MdSidenavModule, MdButtonModule, MdMenuModule, MdToolbarModule } from '@angular/material';

@NgModule({
  exports: [MdSidenavModule, MdButtonModule, MdMenuModule, MdToolbarModule]
})
export class MaterialModule {}
