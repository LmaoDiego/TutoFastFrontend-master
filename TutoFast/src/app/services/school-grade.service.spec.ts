import { TestBed } from '@angular/core/testing';

import { SchoolGradeService } from './school-grade.service';

describe('SchoolGradeService', () => {
  let service: SchoolGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
