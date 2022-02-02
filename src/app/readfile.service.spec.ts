import { TestBed } from '@angular/core/testing';

import { ReadfileService } from './readfile.service';

describe('ReadfileService', () => {
  let service: ReadfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
