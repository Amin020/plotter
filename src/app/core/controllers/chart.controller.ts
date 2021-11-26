import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../services/data-service';
import { ColumnModel } from '../models/column-model';
import { ChartMapper } from '../mappers/chart-mapper';

@Injectable()
export class ChartController {

    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });
    private options = {
        headers: this.httpHeaders
    };
    private chartMapper = new ChartMapper();
    private url = 'https://plotter-task.herokuapp.com/data';

    constructor(
        private dataService: DataService
    ) {
    }

    getChartData(measures: Array<ColumnModel>, dimensions: Array<ColumnModel>, onSuccess: (datasets: any[], labels: []) => void, onError: (error: HttpErrorResponse) => void): void {
        const requestBody = {
            measures: measures.map(measure => measure.name),
            dimension: dimensions.map(dimension => dimension.name)[0]
        };
        this.dataService.create(this.url, requestBody, this.options).subscribe((response) => {
            const chartDataLabels = this.chartMapper.fromJson(response);
            onSuccess(chartDataLabels.datasets, chartDataLabels.labels);
        }, (error) => {
            onError(error);
        });
    }

}