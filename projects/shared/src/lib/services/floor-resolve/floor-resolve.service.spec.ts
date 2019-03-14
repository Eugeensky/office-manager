import { TestBed } from '@angular/core/testing';

import { FloorResolveService } from './floor-resolve.service';

describe('FloorResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FloorResolveService = TestBed.get(FloorResolveService);
    expect(service).toBeTruthy();
  });
});
