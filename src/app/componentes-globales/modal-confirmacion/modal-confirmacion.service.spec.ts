import { TestBed, inject } from '@angular/core/testing';

import { ModalConfirmacionService } from './modal-confirmacion.service';

describe('ModalConfirmacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalConfirmacionService]
    });
  });

  it('should be created', inject([ModalConfirmacionService], (service: ModalConfirmacionService) => {
    expect(service).toBeTruthy();
  }));
});
