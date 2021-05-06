import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeReportListComponent } from './outcome-report-list.component';

describe('OutcomeReportListComponent', () => {
  let component: OutcomeReportListComponent;
  let fixture: ComponentFixture<OutcomeReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutcomeReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomeReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
