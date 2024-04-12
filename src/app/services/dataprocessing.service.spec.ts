import { TestBed } from '@angular/core/testing';

import { DataprocessingService } from './dataprocessing.service';

describe('DataprocessingService', () => {
  let service: DataprocessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataprocessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
