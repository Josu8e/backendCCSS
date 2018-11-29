import { TestBed, inject } from '@angular/core/testing';

import { ReportePersonaService } from './reporte-persona.service';

describe('ReportePersonaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportePersonaService],
    });
  });

  it('should be created', inject([ReportePersonaService], (service: ReportePersonaService) => {
    expect(service).toBeTruthy();
  }));
});
