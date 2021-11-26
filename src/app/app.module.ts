import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { ColumnsController } from './core/controllers/columns.controller';
import { DataService } from './core/controllers/data-service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    ColumnsController
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
