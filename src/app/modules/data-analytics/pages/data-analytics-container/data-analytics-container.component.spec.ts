import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalyticsContainerComponent } from './data-analytics-container.component';

describe('DataAnalyticsContainerComponent', () => {
  let component: DataAnalyticsContainerComponent;
  let fixture: ComponentFixture<DataAnalyticsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAnalyticsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAnalyticsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
