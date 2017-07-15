import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBarComponent } from './user-bar.component';
import { MaterialModule } from '../-material/material.module';

@NgModule({
    declarations: [ UserBarComponent ],
    imports: [ CommonModule, MaterialModule ],
    exports: [ UserBarComponent, MaterialModule ],
    providers: [],
})
export class SharedModule {}
