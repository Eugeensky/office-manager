import { TestBed } from '@angular/core/testing';

import { RequestResolveService } from './request-resolve.service';

describe('RequestResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestResolveService = TestBed.get(RequestResolveService);
    expect(service).toBeTruthy();
  });
});
