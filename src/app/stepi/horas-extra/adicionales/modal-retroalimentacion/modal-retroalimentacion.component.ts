import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { SolicitudService } from '../solicitud.service';

@Component({
  selector: 'modal-retroalimentacion',
  templateUrl: './modal-retroalimentacion.component.html',
  styleUrls: ['./modal-retroalimentacion.component.scss']
})
export class ModalRetroalimentacionComponent implements OnInit {

  // recupera el id del puesto seleccionado
  @Input() idPuesto;

  // lista de solicitudes por puesto
  @Input() solicitudesHePuesto;
  // registro por puesto con el cual se trabajará
  private solicitudActual;
  // resplado de la retroalimentación previa
  private respaldo;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    // se busca la solicitud seleccionada
    this.solicitudesHePuesto.forEach(registro => {
      if (registro.id_puesto === this.idPuesto) {
        this.solicitudActual = registro;
        // se respalda la retroalimentación previa al posible cambio
        this.respaldo = registro.retroalimentacion;
        return;
      }
    }); 
  }

  cerrar(){
    // se recupera el valor inicial
    this.solicitudActual.retroalimentacion = this.respaldo;
    // cambiar por id de la solicitud
    // se envía el id de puesto de la solicitud 
    this.activeModal.close(this.solicitudActual.retroalimentacion);
  }

  guardarDatos(){
    // se envían los datos tal y comó los ha ingresado el usuario
    this.activeModal.close(this.solicitudActual.retroalimentacion);
  }

}
