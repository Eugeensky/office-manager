import { TestBed } from '@angular/core/testing';

import { FloorsResolveService } from './floors-resolve.service';

describe('FloorsResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FloorsResolveService = TestBed.get(FloorsResolveService);
    expect(service).toBeTruthy();
  });
});
