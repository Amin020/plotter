import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-column-list',
  templateUrl: './column-list.component.html',
  styleUrls: ['./column-list.component.scss']
})
export class ColumnListComponent implements OnInit {

  columns = ['Product', 'Revenue', 'Year'];

  constructor() { }

  ngOnInit(): void {
  }

}
