import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from '../solicitud.service';
import { HeMensualPuesto } from '../../he_mensual_puesto';

@Component({
  selector: 'ngx-modal-realizar',
  templateUrl: './modal-realizar.component.html',
  styleUrls: ['./modal-realizar.component.scss'],
})
export class ModalRealizarComponent implements OnInit {

  // variable que en caso de ser nula indica que la acción a realizar es agregar
  // en caso contrario recupera el id del puesto a modificar
   @Input() idPuesto;
  // lista de solicitudes por puesto
  @Input() solicitudesHePuesto;
  // registro por puesto con el cual se trabajará
  private solicitudActual;
  // lista de puestos del servicio
  private puestos;
  // registro de respaldo en caso de desacartar cambios al editar
  private respaldo = null;

  constructor(public activeModal: NgbActiveModal, private solicitudService: SolicitudService) { }

  ngOnInit() {
    // si no se recibe un subindice la acción a realizar es agregar
    if (this.idPuesto == null) {
      // crea una nueva instancia
      this.solicitudActual = new HeMensualPuesto();
      // recupera la lista de puestos
      this.solicitudService.puestos.subscribe( res => this.puestos = res);
      // se eliminan de la lista de puesto aquellos puestos que ya hayan sido seleccionados
      for (let index = 0; index < this.puestos.length; index++) {
        this.solicitudesHePuesto.forEach(solicitud => {
          if (this.puestos[index].id === solicitud.id_puesto) {
            this.puestos.splice(index,1);
          }
        });        
      }
      // en caso de que no hayan más puestos por seleccionar
      if (this.puestos.length == 0) {
        // lanzar el alert indicando que ya se seleccionaron todos los puestos
        this.activeModal.close();
      }
    // en caso de recibir un subindice
    }else {
      // se busca la solicitud seleccionada
      this.solicitudesHePuesto.forEach(registro => {
        if (registro.id_puesto === this.idPuesto) {
          this.solicitudActual = registro;
          // respalda los datos actuales
          this.respaldo = Object.assign({},this.solicitudActual);
          return;
        }
      });
      // En caso de no encontrar el registro no se muestra el modal
      if (!this.solicitudActual) {
        // notificar que no se encontró el registro
        this.activeModal.close();
      }
    }
  }

  guardarDatos() {
    // en caso de agregar inserta el nuevo registro
    // no hace falta validar la edición, pues se realiza automáticamente
    if (this.idPuesto == null) {
      this.solicitudesHePuesto.push(this.solicitudActual);
    }
    // cierra el modal
    this.activeModal.close();
  }

  cerrar(){  
    this.activeModal.close(this.respaldo);
  }
}
