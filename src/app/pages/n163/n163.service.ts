import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class N163Service {
    constructor(
        private http: HttpClient
    ) {}
    public Info(id: number | number[]): Observable<any> {
        return id instanceof Array ?
        this.http.post(`https://api.163.yitimo.com/info/multi/`, {ids: id}) :
        this.http.get(`https://api.163.yitimo.com/info/music/${id}`);
    }
    public Lyric(id: number): Observable<any> {
        return this.http.get(`https://api.163.yitimo.com/lyric/${id}`);
    }
    public Download(id: number | number[]): Observable<any> {
        return id instanceof Array ?
        this.http.post(`https://api.163.yitimo.com/download/multi/`, {ids: id}) :
        this.http.get(`https://api.163.yitimo.com/download/${id}`);
    }
}
