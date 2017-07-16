import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBarComponent } from './user-bar.component';
import { MaterialModule } from '../-material/material.module';
import { YTBCardComponent } from './ytb-card.component';

@NgModule({
    declarations: [ UserBarComponent, YTBCardComponent ],
    imports: [ CommonModule, MaterialModule ],
    exports: [ UserBarComponent, MaterialModule, YTBCardComponent ],
    providers: [],
})
export class SharedModule {}
