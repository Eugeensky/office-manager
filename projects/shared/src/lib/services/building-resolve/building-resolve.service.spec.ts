import { TestBed } from '@angular/core/testing';

import { BuildingResolveService } from './building-resolve.service';

describe('FloorsResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildingResolveService = TestBed.get(BuildingResolveService);
    expect(service).toBeTruthy();
  });
});
