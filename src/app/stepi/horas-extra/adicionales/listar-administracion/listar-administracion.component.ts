import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
//import { SolicitudService } from '../solicitud.service';
import {ToasterManagerService} from '../../../../@core/toast/toaster-manager.service';
import {configToasterManager} from '../../../../@core/toast/config';
import { AuthService } from "../../../../auth/auth.service";
import 'style-loader!angular2-toaster/toaster.css';
import { AdicionalesService } from '../adicionales.service';

@Component({
  selector: 'ngx-listar-administracion',
  templateUrl: './listar-administracion.component.html',
  styleUrls: ['./listar-administracion.component.scss']
})
export class ListarAdministracionComponent implements OnInit {

  //configuración del toaster para notificaciones
  private config = configToasterManager;
  // guarda el criterio de busqueda para el filtro
  private buscar;
  private registros;
  // lista de opciones para el filtro
  private opciones; 
  // opción seleccionada por el usuario
  private opcionSeleccionada: any = 'Servicio'; 
  constructor( private _router:Router, private adicionalesService:AdicionalesService,
     private toasterManagerService: ToasterManagerService, private authService:AuthService,) { }

  ngOnInit() {
    // opciones para el filtrado
    this.opciones = ['Servicio','Solicitante'];
    this.adicionalesService.getListarAdministracionInfo().subscribe(
      (info) => {
        if (info.length === 0) {
          this.toasterManagerService.makeToast('warning', 'No hay datos', 'No hay solicitudes de horas extra adicionales actualmente.');
          return;
        }
        this.registros = info;
      },
      //this.registros = info.listaServicios,
      (error) => this.errorHandler(error)      
    );
    //  this.registros =
    // [{nombre:'Lavanderia', jefe_servicio:'Fulanito de tal', horas_solicitadas:'100', id:1},
    // {nombre:'Centro de Gestión Informática', jefe_servicio:'Andy/Jimmy/Leny/El que sea ahorita', horas_solicitadas:'100', id:2},
    // {nombre:'Enfermería', jefe_servicio:'Jefe del servicio de Enfermeria', horas_solicitadas:'1000', id:3},{nombre:'Lavanderia', jefe_servicio:'Fulanito de tal', horas_solicitadas:'100', id:1},
    // {nombre:'Centro de Gestión Informática', jefe_servicio:'Andy/Jimmy/Leny/El que sea ahorita', horas_solicitadas:'100', id:2},
    // {nombre:'Enfermería', jefe_servicio:'Jefe del servicio de Enfermeria', horas_solicitadas:'1000', id:3},{nombre:'Lavanderia', jefe_servicio:'Fulanito de tal', horas_solicitadas:'100', id:1},
    // {nombre:'Centro de Gestión Informática', jefe_servicio:'Andy/Jimmy/Leny/El que sea ahorita', horas_solicitadas:'100', id:2},
    // {nombre:'Enfermería', jefe_servicio:'Jefe del servicio de Enfermeria', horas_solicitadas:'1000', id:3},{nombre:'Lavanderia', jefe_servicio:'Fulanito de tal', horas_solicitadas:'100', id:1},
    // {nombre:'Centro de Gestión Informática', jefe_servicio:'Andy/Jimmy/Leny/El que sea ahorita', horas_solicitadas:'100', id:2},
    // {nombre:'Enfermería', jefe_servicio:'Jefe del servicio de Enfermeria', horas_solicitadas:'1000', id:3},{nombre:'Lavanderia', jefe_servicio:'Fulanito de tal', horas_solicitadas:'100', id:1},
    // {nombre:'Centro de Gestión Informática', jefe_servicio:'Andy/Jimmy/Leny/El que sea ahorita', horas_solicitadas:'100', id:2},
    // {nombre:'Enfermería', jefe_servicio:'Jefe del servicio de Enfermeria', horas_solicitadas:'1000', id:3},]
  }

  errorHandler(error){
    switch (error.status) {
      // el servidor no se encuentra disponible
      case 0: {
        this.toasterManagerService.makeToast('error', 'Error', 'Error en la conexion con el servidor.');
        break;  
      }default:{
        this.toasterManagerService.makeToast('error', 'Error', 'No se pudo recuperar la lista de solicitudes de horas adicionales.');
        break;
      }
    }
  }

}
