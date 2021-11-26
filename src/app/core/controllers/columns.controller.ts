import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../services/data-service';

@Injectable()
export class ColumnsController {

    private url = 'https://plotter-task.herokuapp.com/columns';

    constructor(
        private dataService: DataService
    ) {
    }

    getAllColumns(onSuccess: (columns: any) => void, onError: (error: HttpErrorResponse) => void): void {
        this.dataService.getAll(this.url).subscribe((response) => {
            onSuccess(response);
        }, (error) => {
            onError(error);
        });
    }

}