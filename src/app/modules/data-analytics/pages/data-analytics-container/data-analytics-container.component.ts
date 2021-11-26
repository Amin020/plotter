import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnsController } from 'src/app/core/controllers/columns.controller';
import { ColumnModel } from 'src/app/core/models/column-model';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-data-analytics-container',
  templateUrl: './data-analytics-container.component.html',
  styleUrls: ['./data-analytics-container.component.scss']
})
export class DataAnalyticsContainerComponent implements OnInit {

  isLoading: boolean;
  error: boolean;
  droppedDimensions: Array<ColumnModel> = new Array<ColumnModel>();
  droppedMeasures: Array<ColumnModel> = new Array<ColumnModel>();
  columns: Array<ColumnModel> = new Array<ColumnModel>();

  constructor(
    private spinner: NgxSpinnerService,
    private columnsController: ColumnsController
  ) { }

  ngOnInit(): void {
    this.getAllColumns();
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

  drop($ev: CdkDragDrop<string[]>): void {
    transferArrayItem($ev.previousContainer.data,
      $ev.container.data,
      $ev.previousIndex,
      $ev.currentIndex);
  }

  clearData(type: string) {
    if (type === 'dimension') {
      this.columns.push(...this.droppedDimensions);
      this.droppedDimensions = [];
    } else if (type === 'measure') {
      this.columns.push(...this.droppedMeasures);
      this.droppedMeasures = [];
    }
  }

}
