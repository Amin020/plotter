import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DataService } from './data-service';


@Injectable()
export class ColumnsController {

    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    private options = {
        headers: this.httpHeaders
    };

    url = 'https://plotter-task.herokuapp.com/columns';
    // private columnsMapper = new ColumnsMapper();

    constructor(
        private dataService: DataService
    ) {
    }

    getAllColumns(onSuccess: (columns: any) => void, onError: (error: HttpErrorResponse) => void): void {
        this.dataService.getAll(this.url).subscribe((response) => {
            // const columns = this.columnsMapper.fromList(response[`content`]);
            onSuccess(response);
        }, (error) => {
            onError(error);
        });
    }

}