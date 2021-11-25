import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataAnalyticsRoutingModule } from './data-analytics-routing.module';
import { ColumnListComponent } from './components/column-list/column-list.component';
import { DataAnalyticsContainerComponent } from './pages/data-analytics-container/data-analytics-container.component';


@NgModule({
  declarations: [ColumnListComponent, DataAnalyticsContainerComponent],
  imports: [
    CommonModule,
    DataAnalyticsRoutingModule
  ]
})
export class DataAnalyticsModule { }
