import { TestBed } from '@angular/core/testing';

import { FileeService } from './filee.service';

describe('FileService', () => {
  let service: FileeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
