import { TestBed } from '@angular/core/testing';

import { ConstructorResolveService } from './constructor-resolve.service';

describe('ConstructorResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConstructorResolveService = TestBed.get(ConstructorResolveService);
    expect(service).toBeTruthy();
  });
});
