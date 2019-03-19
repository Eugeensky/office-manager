import { TestBed } from '@angular/core/testing';

import { RoomResolveService } from './room-resolve.service';

describe('RoomResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomResolveService = TestBed.get(RoomResolveService);
    expect(service).toBeTruthy();
  });
});
