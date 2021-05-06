import { TestBed } from '@angular/core/testing';

import { EconomicLevelService } from './economic-level.service';

describe('EconomicLevelService', () => {
  let service: EconomicLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EconomicLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
