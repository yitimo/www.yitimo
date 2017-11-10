import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    public Set(key: string, value: any): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    public Get(key: string): any {
        let tryGet = window.localStorage.getItem(key);
        return tryGet ? JSON.parse(tryGet) : null;
    }
}
