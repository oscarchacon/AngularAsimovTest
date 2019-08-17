import { TestBed } from '@angular/core/testing';

import { DeathDateService } from './death-date.service';

describe('DeathDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeathDateService = TestBed.get(DeathDateService);
    expect(service).toBeTruthy();
  });
});
