import { TestBed } from '@angular/core/testing';

import { SchoolLevelService } from './school-level.service';

describe('SchoolLevelService', () => {
  let service: SchoolLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
