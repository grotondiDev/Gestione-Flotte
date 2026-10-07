import { TestBed } from '@angular/core/testing';

import { MezziService } from './mezzi.service';

describe('MezziService', () => {
  let service: MezziService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MezziService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
