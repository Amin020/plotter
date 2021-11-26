import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnsController } from 'src/app/core/controllers/columns.controller';
import { ColumnModel } from 'src/app/core/models/column-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Chart } from 'chart.js';
import { ChartController } from 'src/app/core/controllers/chart.controller';


@Component({
  selector: 'app-data-analytics-container',
  templateUrl: './data-analytics-container.component.html',
  styleUrls: ['./data-analytics-container.component.scss']
})
export class DataAnalyticsContainerComponent implements OnInit, AfterViewInit {

  isLoading: boolean;
  error: boolean;
  droppedDimensions: Array<ColumnModel> = new Array<ColumnModel>();
  droppedMeasures: Array<ColumnModel> = new Array<ColumnModel>();
  columns: Array<ColumnModel> = new Array<ColumnModel>();
  canvas: any;
  ctx: any;
  config: any;
  data = {
    labels: [],
    datasets: [],
  };
  @ViewChild('mychart') mychart: ElementRef;

  constructor(
    private spinner: NgxSpinnerService,
    private columnsController: ColumnsController,
    private chartController: ChartController
  ) { }

  ngOnInit(): void {
    this.getAllColumns();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderChart();
    }, 500);
  }

  private getAllColumns(): void {
    this.isLoading = true;
    this.error = false;
    this.spinner.show();
    this.columnsController.getAllColumns(columns => {
      this.isLoading = false;
      this.spinner.hide();
      this.columns = columns;
    }, error => {
      this.error = true;
      this.isLoading = false;
      this.spinner.hide();
    });
  }

  private renderChart(): void {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        scaleShowValues: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: false
            }
          }]
        }
      }
    });
  }

  drop($ev: CdkDragDrop<string[]>): void {
    transferArrayItem($ev.previousContainer.data, $ev.container.data, $ev.previousIndex, $ev.currentIndex);
    if (this.droppedMeasures.length && this.droppedDimensions.length) {
      this.drawLineChart();
    }
  }

  private drawLineChart(): void {
    this.spinner.show();
    this.chartController.getChartData(this.droppedMeasures, this.droppedDimensions, (chartDatasets, chartLabels) => {
      this.data = { datasets: chartDatasets, labels: chartLabels };
      this.spinner.hide();
      this.renderChart();
    }, error => {
      this.spinner.hide();
    });
  }

  clearData(type: string): void {
    if (type === 'dimension') {
      this.columns.push(...this.droppedDimensions);
      this.droppedDimensions = [];
      this.data.labels = [];
    } else if (type === 'measure') {
      this.columns.push(...this.droppedMeasures);
      this.droppedMeasures = [];
    }
    this.data.datasets = [];
    this.renderChart();
  }

}
