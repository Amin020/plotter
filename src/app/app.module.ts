import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { ColumnsController } from './core/controllers/columns.controller';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './core/services/data-service';
import { ChartController } from './core/controllers/chart.controller';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    ColumnsController,
    ChartController
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
