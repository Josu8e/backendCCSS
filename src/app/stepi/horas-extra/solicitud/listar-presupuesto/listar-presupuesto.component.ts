import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SolicitudService } from '../solicitud.service';
import {ToasterManagerService} from '../../../../@core/toast/toaster-manager.service';
import {configToasterManager} from '../../../../@core/toast/config';
import { AuthService } from "../../../../auth/auth.service";
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-listar-presupuesto',
  templateUrl: './listar-presupuesto.component.html',
  styleUrls: ['./listar-presupuesto.component.scss']
})
export class ListarPresupuestoComponent implements OnInit {

  //configuración del toaster para notificaciones
  private config = configToasterManager;
  // variable que guarda el criterio de busqueda para el filtro
  private buscar;
  private registros;
  // lista de opciones para el filtro
  private opciones; 
  // opción seleccionada por el usuario
  private opcionSeleccionada: any = 'Servicio'; 
  constructor( private _router:Router, private solicitudService:SolicitudService, 
    private toasterManagerService: ToasterManagerService, private authService:AuthService ) { }

  ngOnInit() {
    // opciones para el filtrado
   this.opciones = ['Servicio','Solicitante'];
   // llamada al servidor
   this.solicitudService.getListarPresupuestoInfo().subscribe(
      (info) => {
        if (info.listaServicios.length === 0) {
          this.toasterManagerService.makeToast('warning', 'No hay datos', 'No hay solicitudes de horas extra para el mes actual pendientes de aprobación presupuestaria.');
          return;
        }
        this.registros = info.listaServicios
      },
      (error) => this.errorHandler(error)      
    );
  }

  errorHandler(error){
    switch (error.status) {
      // el servidor no se encuentra disponible
      case 0: {
        this.toasterManagerService.makeToast('error', 'Error', 'Error en la conexion con el servidor.');
        break;  
      }default:{
        this.toasterManagerService.makeToast('error', 'Error', 'No se pudo recuperar la lista de solicitudes pendientes a la aprobación presupuestaria.');
        break;
      }
    }
  }

}
