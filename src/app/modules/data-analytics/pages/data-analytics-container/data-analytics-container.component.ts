import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnsController } from 'src/app/core/controllers/columns.controller';
import { ColumnModel } from 'src/app/core/models/column-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Chart } from 'chart.js';
import { ChartController } from 'src/app/core/controllers/chart.controller';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';


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
  private canvas: any;
  private ctx: any;
  private data = {
    labels: [],
    datasets: [],
  };
  private yAxesMeasureLabel = [];
  private xAxesDimensionLabel = [];
  @ViewChild('mychart') private mychart: ElementRef;

  constructor(
    private spinner: NgxSpinnerService,
    private columnsController: ColumnsController,
    private chartController: ChartController,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit(): void {
    this.getAllColumns();
  }

  ngAfterViewInit(): void {
    this.renderChart();
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

  renderChart(): void {
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
            },
            scaleLabel: {
              labelString: this.yAxesMeasureLabel,
              display: true,
            },
          }],
          xAxes: [{
            ticks: {
              autoSkip: false
            },
            scaleLabel: {
              labelString: this.xAxesDimensionLabel,
              display: true,
            },
          }]
        }
      }
    });
  }

  drop($ev: CdkDragDrop<string[]>, type: string): void {
    if (!this.isDroppingValid(type, $ev.previousContainer.data[$ev.previousIndex])) {
      return;
    }
    transferArrayItem($ev.previousContainer.data, $ev.container.data, $ev.previousIndex, $ev.currentIndex);
    if (this.droppedMeasures.length && this.droppedDimensions.length) {
      this.drawLineChart();
    }
  }

  private isDroppingValid(type: string, draggedItem: any): boolean {
    let isValid = true;
    if (type === 'dimension') {
      if (this.droppedDimensions.length > 0) {
        this.snotifyService.error('Should only contains one dimension!', 'Oops', {
          showProgressBar: true,
          position: SnotifyPosition.leftBottom
        });
        isValid = false;
      } else if (draggedItem.function === 'measure') {
        this.snotifyService.error('Dragged column represents Measure!', 'Oops', {
          showProgressBar: true,
          position: SnotifyPosition.leftBottom
        });
        isValid = false;
      }
    }
    if (type === 'measure') {
      if (draggedItem.function === 'dimension') {
        this.snotifyService.error('Dragged column represents Dimension!', 'Oops', {
          showProgressBar: true,
          position: SnotifyPosition.leftBottom
        });
        isValid = false;
      }
    }
    return isValid;
  }

  private drawLineChart(): void {
    this.spinner.show();
    this.chartController.getChartData(this.droppedMeasures, this.droppedDimensions, (chartDatasets, chartLabels) => {
      this.data = { datasets: chartDatasets, labels: chartLabels };
      this.yAxesMeasureLabel = this.droppedMeasures.map(measure => measure.name);
      this.xAxesDimensionLabel = this.droppedDimensions.map(dimension => dimension.name);;
      this.spinner.hide();
      this.renderChart();
    }, error => {
      this.spinner.hide();
      this.snotifyService.error(error.error.message, 'Opps', {
        showProgressBar: true,
        position: SnotifyPosition.leftBottom
      });
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
    this.yAxesMeasureLabel = [];
    this.xAxesDimensionLabel = [];
    this.renderChart();
  }

}
