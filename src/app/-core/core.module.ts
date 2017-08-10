import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Yttp } from './services/yttp.service';

@NgModule({
    declarations: [],
    imports: [ CommonModule, FormsModule, HttpModule ],
    exports: [],
    providers: [Yttp],
})
export class CoreModule {}
