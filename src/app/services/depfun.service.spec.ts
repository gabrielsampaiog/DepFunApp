import { TestBed } from '@angular/core/testing';

import { DepfunService } from './depfun.service';

describe('DepfunService', () => {
  let service: DepfunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepfunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
