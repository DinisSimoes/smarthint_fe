import { TestBed } from '@angular/core/testing';

import { GlobalsService } from '../shared/globals.service';

describe('GlobalsService', () => {
  let service: GlobalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
