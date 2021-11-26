import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-data-analytics-container',
  templateUrl: './data-analytics-container.component.html',
  styleUrls: ['./data-analytics-container.component.scss']
})
export class DataAnalyticsContainerComponent implements OnInit {

  droppedDimensions: any = [];
  droppedMeasures: any = [];
  columns = ['Product', 'Revenue', 'Year'];

  constructor() { }

  ngOnInit(): void {
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
