import { TestBed } from '@angular/core/testing';

import { PosizioniService } from './posizioni.service';

describe('PosizioniService', () => {
  let service: PosizioniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosizioniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
