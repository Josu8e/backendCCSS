import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeMensualPuesto } from '../../he_mensual_puesto';

@Component({
  selector: 'ngx-modal-modificar',
  templateUrl: './modal-modificar.component.html',
  styleUrls: ['./modal-modificar.component.scss']
})
export class ModalModificarComponent implements OnInit {

  
  // variable que en caso de ser nula indica que la acción a realizar es agregar
  // en caso contrario recupera el id del puesto a modificar
  @Input() idPuesto;
  // lista de solicitudes por puesto
  @Input() solicitudesHePuesto;
  // registro por puesto con el cual se trabajará
  @Input() solicitudActual;
  // lista de puestos del servicio
  private puestos;
  // registro de respaldo en caso de desacartar cambios al editar
  private respaldo = null;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    // guarda le respaldo del registro
    this.respaldo = Object.assign({},this.solicitudActual);
  }

  guardarDatos() {
    // cierra el modal
    this.activeModal.close(this.solicitudActual);
  }

  cerrar(){  
    this.activeModal.close(this.respaldo);
  }

}