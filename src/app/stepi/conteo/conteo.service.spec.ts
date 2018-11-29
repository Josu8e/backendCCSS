import { TestBed, inject } from '@angular/core/testing';

import { ConteoService } from './conteo.service';

describe('ConteoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConteoService]
    });
  });

  it('should be created', inject([ConteoService], (service: ConteoService) => {
    expect(service).toBeTruthy();
  }));
});
