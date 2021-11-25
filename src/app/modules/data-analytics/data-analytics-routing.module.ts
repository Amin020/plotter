import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataAnalyticsContainerComponent } from './pages/data-analytics-container/data-analytics-container.component';

const routes: Routes = [
  {
    path: '',
    component: DataAnalyticsContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataAnalyticsRoutingModule { }
