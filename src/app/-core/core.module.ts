import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http } from './services/http';
import { DisableGuard } from './guards/disable.guard';
import { MarkDownService } from './services/markdown';

@NgModule({
    declarations: [],
    imports: [ CommonModule, FormsModule, HttpClientModule ],
    exports: [],
    providers: [Http, DisableGuard, MarkDownService],
})
export class CoreModule {}
