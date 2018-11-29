import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmacionComponent } from './modal-confirmacion.component';

@Injectable()
export class ModalConfirmacionService {

  constructor(private modalService: NgbModal) { }
  public confirmar(
    titulo: string,
    mensaje: string,
    btnOkText: string = 'Aceptar',
    btnCancelText: string = 'Cancelar',
    dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
    var modalOption: NgbModalOptions = {};
    modalOption.size = dialogSize;
    const modalRef = this.modalService.open(ModalConfirmacionComponent, modalOption);
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.mensaje = mensaje;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }
}
