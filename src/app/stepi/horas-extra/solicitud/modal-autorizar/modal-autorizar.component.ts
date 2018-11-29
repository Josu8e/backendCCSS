import { Component, OnInit, Input } from '@angular/core';
import { SolicitudService } from '../solicitud.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal-autorizar',
  templateUrl: './modal-autorizar.component.html',
  styleUrls: ['./modal-autorizar.component.scss']
})
export class ModalAutorizarComponent implements OnInit {
  // lista de solicitudes por puesto
  @Input() solicitudesHePuesto;
  // lista que respalda las solicitudes en caso de descartar cambios
  private respaldo;

  constructor(private solicitudService: SolicitudService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
    // se respalda la lista original en caso de que se quieran descartar los cambios
    this.respaldo = this.solicitudesHePuesto.map(registro => Object.assign({},registro));
  }

  // función que guarda los datos ingresados 
  guardarDatos() {
    // cierra el modal
    this.activeModal.close(this.solicitudesHePuesto);
  }
}
