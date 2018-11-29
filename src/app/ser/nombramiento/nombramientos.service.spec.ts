import { TestBed, inject } from '@angular/core/testing';

import { NombramientosService } from './nombramientos.service';

describe('NombramientosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NombramientosService],
    });
  });

  it('should be created', inject([NombramientosService], (service: NombramientosService) => {
    expect(service).toBeTruthy();
  }));
});
