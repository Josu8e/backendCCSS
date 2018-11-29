import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalAprobarComponent } from '../modal-aprobar/modal-aprobar.component';
//import { SolicitudService } from '../solicitud.service';
import {ToasterManagerService} from '../../../../@core/toast/toaster-manager.service';
import {configToasterManager} from '../../../../@core/toast/config';
import { AuthService } from "../../../../auth/auth.service";
import 'style-loader!angular2-toaster/toaster.css';
import { AdicionalesService } from '../adicionales.service';
import { ModalConfirmacionService } from '../../../../componentes-globales/modal-confirmacion/modal-confirmacion.service';

@Component({
  selector: 'ngx-aprobacion',
  templateUrl: './aprobacion.component.html',
  styleUrls: ['./aprobacion.component.scss']
})
export class AprobacionComponent implements OnInit {

  //configuración del toaster para notificaciones
  private config = configToasterManager;
  // guarda el criterio de busqueda para el filtro
  private buscar;
  // lista de registros recuperados del backend
  private registros;
  // lista de opciones para el filtro
  private opciones; 
  // opción seleccionada por el usuario
  private opcionSeleccionada: any = 'Servicio'; 
  // opciones del modal, permite que solo se pueda cerrar el modal al precionar los botones destinados para eso
  private modalOption: NgbModalOptions = {};


  constructor(private modalService: NgbModal,
     private toasterManagerService: ToasterManagerService, private authService:AuthService,
     private adicionalesService:AdicionalesService, private modalConfirmacionService:ModalConfirmacionService) { }

  ngOnInit() {
    // opciones de filtrado
    this.opciones = ['Servicio','Solicitante'];
    this.adicionalesService.getAprobacionInfo().subscribe(
      (info) => {
        console.log(info);
        
        if (info.listaServicios.length === 0) {
          this.toasterManagerService.makeToast('warning', 'No hay datos', 'No hay solicitudes de horas extra adicionales pendientes de aprobación final.');
          return;
        }
        this.registros = info.listaServicios;
      },
      (error) => this.toasterManagerService.makeToast('error', 'Error', 'No se pudo recuperar la lista de solicicitudes pendientes de aprobación.')      
    );
  }

  // función que llama al componente modal-aprobar
  aprobar(idHEMensualServicio) {
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Realmente desea aprobar esta solicitud?')
    .then((confirmed) => {
      if (confirmed) {
          const object = `{"id_he_mensual_servicio":"${idHEMensualServicio}","estado":"A"}`;
          console.log(object);
          this.adicionalesService.putAprobacion(JSON.parse(object)).subscribe(
            ()=> this.toasterManagerService.makeToast('success', 'Aprobación Final', 'La solicitud ha sido aprobada exitosamente.'),
            (error)=>this.toasterManagerService.makeToast('error', 'Error', 'No se ha podido aprobar la solicitud.')
          );
        }
      }
    );
  }
}
