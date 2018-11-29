import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-observaciones',
  templateUrl: './modal-observaciones.component.html',
  styleUrls: ['./modal-observaciones.component.scss']
})
export class ModalObservacionesComponent implements OnInit {

  // representa la retroalimentación a las observaciones
  @Input() retroalimentacion;

  // resplado de la retroalimentación previa
  private respaldo;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.respaldo = this.retroalimentacion;
  }

  cerrar(){
    // se envía el respaldo
    this.activeModal.close(this.respaldo);
  }

  guardarDatos(){
    // se envían los datos tal y comó los ha ingresado el usuario
    this.activeModal.close(this.retroalimentacion);
  }

}
