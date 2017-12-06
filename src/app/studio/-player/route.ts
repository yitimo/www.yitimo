import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class StudioRouteService {
    constructor(
        private router: Router
    ) {}
    public lyric() {
        this.doRedirect('lyric');
    }
    public list() {
        this.doRedirect('list');
    }
    public root() {
        this.doRedirect();
    }
    public isOpen(): boolean {
        return !!this.router.url.match(/\(studio\:[0-9a-zA-Z\/]+\)/);
    }
    private doRedirect(path?: string) {
        let curr = this.router.url;
        if (!!curr.match(/\(studio\:[0-9a-zA-Z\/]+\)/)) {
            this.router.navigateByUrl(this.router.url.replace(/\(studio\:[0-9a-zA-Z\/]+\)/, `(studio:studio${path ? ('/' + path) : ''})`));
        } else {
            this.router.navigate([{ outlets: { studio: `studio${path ? ('/' + path) : ''}` }}]);
        }
    }
}
