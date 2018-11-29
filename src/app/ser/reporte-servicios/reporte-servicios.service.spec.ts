import { TestBed, inject } from '@angular/core/testing';

import { ReporteServiciosService } from './reporte-servicios.service';

describe('ReporteServiciosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReporteServiciosService],
    });
  });
  it('should be created', inject([ReporteServiciosService], (service: ReporteServiciosService) => {
    expect(service).toBeTruthy();
  }));
});
