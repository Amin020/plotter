import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataAnalyticsRoutingModule } from './data-analytics-routing.module';
import { DataAnalyticsContainerComponent } from './pages/data-analytics-container/data-analytics-container.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DataAnalyticsContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataAnalyticsRoutingModule
  ]
})
export class DataAnalyticsModule { }
