import { TestBed, inject } from '@angular/core/testing';

import { AdicionalesService } from './adicionales.service';

describe('AdicionalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdicionalesService]
    });
  });

  it('should be created', inject([AdicionalesService], (service: AdicionalesService) => {
    expect(service).toBeTruthy();
  }));
});
