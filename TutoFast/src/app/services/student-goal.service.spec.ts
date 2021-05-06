import { TestBed } from '@angular/core/testing';

import { StudentGoalService } from './student-goal.service';

describe('StudentGoalService', () => {
  let service: StudentGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
