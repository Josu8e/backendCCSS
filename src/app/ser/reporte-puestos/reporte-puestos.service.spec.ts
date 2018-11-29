import { TestBed, inject } from '@angular/core/testing';

import { ReportePuestosService } from './reporte-puestos.service';

describe('ReportePuestosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportePuestosService],
    });
  });

  it('should be created', inject([ReportePuestosService], (service: ReportePuestosService) => {
    expect(service).toBeTruthy();
  }));
});
