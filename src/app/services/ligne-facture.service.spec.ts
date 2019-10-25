import { TestBed } from '@angular/core/testing';

import { LigneFactureService } from './ligne-facture.service';

describe('LigneFactureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LigneFactureService = TestBed.get(LigneFactureService);
    expect(service).toBeTruthy();
  });
});
