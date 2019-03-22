import { TestBed } from '@angular/core/testing';

import { AllRequestsResolveService } from './all-requests-resolve.service';

describe('AllRequestsResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllRequestsResolveService = TestBed.get(AllRequestsResolveService);
    expect(service).toBeTruthy();
  });
});
