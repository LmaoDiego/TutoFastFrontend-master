import { TestBed } from '@angular/core/testing';

import { OutcomeReportService } from './outcome-report.service';

describe('OutcomeReportService', () => {
  let service: OutcomeReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutcomeReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
