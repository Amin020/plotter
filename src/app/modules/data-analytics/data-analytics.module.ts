import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataAnalyticsRoutingModule } from './data-analytics-routing.module';
import { DataAnalyticsContainerComponent } from './pages/data-analytics-container/data-analytics-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    DataAnalyticsContainerComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    DataAnalyticsRoutingModule
  ],
  exports: [
    DragDropModule
  ]
})
export class DataAnalyticsModule { }
