import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    NgxSpinnerModule
  ],
  exports: [
    ErrorComponent,
    DragDropModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
