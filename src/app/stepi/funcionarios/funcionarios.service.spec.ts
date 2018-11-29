import { TestBed, inject } from '@angular/core/testing';

import { FuncionariosService } from './funcionarios.service';

describe('FuncionariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuncionariosService],
    });
  });

  it('should be created', inject([FuncionariosService], (service: FuncionariosService) => {
    expect(service).toBeTruthy();
  }));
});
