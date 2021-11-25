import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-data-analytics-container',
  templateUrl: './data-analytics-container.component.html',
  styleUrls: ['./data-analytics-container.component.scss']
})
export class DataAnalyticsContainerComponent implements OnInit {

  droppedDimension: any;
  droppedMeasure: any;

  constructor() { }

  ngOnInit(): void {
  }

  dropDimension($ev: CdkDragDrop<string[]>): void {
    if ($ev.previousContainer === $ev.container) {
      moveItemInArray($ev.container.data, $ev.previousIndex, $ev.currentIndex);
    } else {
      transferArrayItem($ev.previousContainer.data,
        $ev.container.data,
        $ev.previousIndex,
        $ev.currentIndex);
    }
  }

  dropMeasure($ev: CdkDragDrop<string[]>): void {

  }

}
