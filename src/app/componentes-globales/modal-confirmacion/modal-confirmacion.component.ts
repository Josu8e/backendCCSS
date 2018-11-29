import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngx-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.scss'],
})
export class ModalConfirmacionComponent implements OnInit {
  @Input() titulo: string;
  @Input() mensaje: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  public cancelar() {
    this.activeModal.close(false);
  }

  public aceptar() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
