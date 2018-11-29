import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'detalle-incapacidad',
  templateUrl: './detalle-incapacidad.component.html',
  styleUrls: ['./detalle-incapacidad.component.scss']
})

export class DetalleIncapacidadComponent implements OnInit {

  @Input() doctor;
  @Input() idBoleta;
  modalOptions: NgbModalOptions = {};

  constructor(public activeModal: NgbActiveModal) { }

  cerrar() {
    this.activeModal.close();
  }

  ngOnInit() {

  }

}
