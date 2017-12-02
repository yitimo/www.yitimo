import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http } from './services/http';
import { N163Service } from './services/n163.service';
import { DisableGuard } from './guards/disable.guard';
import { MarkDownService } from './services/markdown';
import { StorageService } from './services/storage';
import { HttpInterceptor } from './services/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StudioService } from './player';

@NgModule({
    declarations: [],
    imports: [ CommonModule, FormsModule, HttpClientModule ],
    exports: [],
    providers: [Http, DisableGuard, MarkDownService, {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptor,
        multi: true
    }, StorageService, StudioService, N163Service],
})
export class CoreModule {}
