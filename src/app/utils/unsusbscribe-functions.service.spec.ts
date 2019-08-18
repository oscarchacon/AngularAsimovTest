import { TestBed } from '@angular/core/testing';

import { UnsusbscribeFunctionsService } from './unsusbscribe-functions.service';

describe('UnsusbscribeFunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnsusbscribeFunctionsService = TestBed.get(UnsusbscribeFunctionsService);
    expect(service).toBeTruthy();
  });
});
