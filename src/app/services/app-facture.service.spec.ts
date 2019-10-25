import { TestBed } from '@angular/core/testing';

import { AppFactureService } from './app-facture.service';

describe('AppFactureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppFactureService = TestBed.get(AppFactureService);
    expect(service).toBeTruthy();
  });
});
