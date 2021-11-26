import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';

@Injectable()
export class DataService {

    timeout = 300000;

    constructor(private http: HttpClient) { }

    getAll(url: string, URLparams?: any) {
        return this.http.get(url, URLparams).pipe(timeout(this.timeout));
    }

    create(url: string, resource?: any, options?: any) {
        return this.http.post(url, JSON.stringify(resource), options).pipe(timeout(this.timeout));
    }

    update(url: string, id: any, resource?: any, options?: any) {
        return this.http.put(url + '/' + id, JSON.stringify(resource), options)
            .pipe(timeout(this.timeout));
    }
}
