import { Component, OnInit } from '@angular/core';
//import { SolicitudService } from '../solicitud.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalPresupuestarComponent } from '../modal-presupuestar/modal-presupuestar.component';
import {ToasterManagerService} from '../../../../@core/toast/toaster-manager.service';
import {configToasterManager} from '../../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';
import { AdicionalesService } from '../adicionales.service';
import { ModalConfirmacionService } from '../../../../componentes-globales/modal-confirmacion/modal-confirmacion.service';

@Component({
  selector: 'ngx-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss'],
})
export class PresupuestoComponent implements OnInit {

  //configuración del toaster para notificaciones
  private config = configToasterManager;
  // cambiar esto la fecha que trae la solicitud
  private fechaActual: Date = new Date();
  private fechaAnterior: Date = new Date();
  // lista de solicitudes por puesto
  private solicitudesHePuesto;
  // id recibido por parametro en la ruta
  private idHEMesualServicio;
  // datos del servidor
  private informacion;
  // valor que guarda el total a pagar por el servicio
  private total = 0;
  // variables que almacenan datos informativos para la solicitud, se usan para evitar
  // errores en consola por peticiones asincrónas
  private nombreServicio = "";
  private solicitante = "";
  private observaciones = "";
  // opciones del modal, permite que solo se pueda cerrar el modal al precionar los botones destinados para eso
  private modalOption: NgbModalOptions = {};
  //evita que el usuario presione más de una vez el botón de enviar
  private estado = false;

  constructor( private _route:ActivatedRoute, private adicionalesService:AdicionalesService,
     private modalService: NgbModal, private toasterManagerService: ToasterManagerService,
     private modalConfirmacionService:ModalConfirmacionService, private _router:Router) { }

  ngOnInit() {
    // recupera el id de la solicitud seleccionada en la vista 'listar'
    this.idHEMesualServicio = +this._route.snapshot.paramMap.get('id');
    // llamada al servidor que recupera la información de la
    // solicitud del servicio con el id igual a idHEMesualServicio
    this.adicionalesService.getPresupuestoInfo(this.idHEMesualServicio).subscribe(
      (info) => {
        this.informacion = info;
        this.solicitudesHePuesto = this.informacion.servicio.puestos; 
        this.solicitudesHePuesto.map(solicitud => {
            solicitud.monto_reservado = solicitud.promedio_salarial * solicitud.horas;
            this.total += solicitud.monto_reservado;            
        });
        // la fecha se actualiza con la fecha de la solicitud
        //NOTA: los meses en JavaScript empiezan en 0
        var fechaDescompuesta =this.informacion.servicio.fecha.split('-');
        this.fechaAnterior = new Date(fechaDescompuesta[0],fechaDescompuesta[1]-1,fechaDescompuesta[2]);        
        // se llenan los datos informativos
        this.nombreServicio = this.informacion.servicio.nombre;
        this.solicitante = this.informacion.servicio.jefe_servicio;   
        this.observaciones = this.informacion.servicio.observaciones;  
      },
      (error) => this.errorHandler(error,false)
    );
  }

  errorHandler(error, envia){
    switch (error.status) {
      // el servidor no se encuentra disponible
      case 0: {
        this.toasterManagerService.makeToast('error', 'Error', 'Error en la conexion con el servidor.');
        break;  
      }default:{
        if (envia) {
          this.toasterManagerService.makeToast('error', 'Error', 'No se han podido guardar los datos ingresados.');  
        } else {
          this.toasterManagerService.makeToast('error', 'Error', 'No se han podido recuperar los datos necesarios.');
        }
        break;
      }
    }
  }

  // función que abre un modal para indicar el monto reservado para cada puesto
  presupuestar(){
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';
    const modalRef = this.modalService.open(ModalPresupuestarComponent, this.modalOption);
    // Parámetros que se le envía al modal
    modalRef.componentInstance.solicitudesHePuesto = this.solicitudesHePuesto;
    // crea un promise que se dispara al cerrar el modal 
    modalRef.result.then( datos => {
      this.solicitudesHePuesto = datos;
      // se actualiza el total
      this.total = 0;
      this.solicitudesHePuesto.map(solicitud => {
        this.total += solicitud.monto_reservado;            
      });
    },
    // función que se llama al descartar el modal, se usa para no generar error en la consola
    ()=>{}
  );}

  enviarSolictud(){
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Realmente desea aprobar el presupuesto de esta solicitud?')
      .then((confirmed) => {
        if (confirmed) {
          for (let index = 0; index < this.solicitudesHePuesto.length; index++) {
            if(!this.solicitudesHePuesto[index].monto_reservado){
              this.toasterManagerService.makeToast('warning','Datos incompletos',"No se puede enviar una solicitud sin monto reservado");       
              return;
            }
          }
          const solicitudes =  this.solicitudesHePuesto.map( solicitud => (
            {
              monto_reservado: solicitud.monto_reservado,
              id_he_adicional: solicitud.id_he_adicional
            }
          ));
          const object = `{"id_he_mensual_servicio":"${this.idHEMesualServicio}","estado":"AP","solicitudes":${JSON.stringify(solicitudes)}}`;
          this.adicionalesService.putPresupuesto(JSON.parse(object)).subscribe(
            ()=>{
              this.toasterManagerService.makeToast('success','Actualización',"Se han asignado los montos reservados a cada puesto de la solicitud.");
              this.estado = true;
              this._router.navigate(['/stepi/horas-extra/adicionales/listar-presupuesto']);
            },(error)=> this.errorHandler(error,true)
          );
        }
      }
    );
  }

  getDescripcionPuesto(idPuesto): string { 
    // variable que almacena el valor de la descripción 
    let descripcion = null;     
    this.informacion.puestos.forEach((puesto) => {
      // busca el puesto para obtener su descripción          
      if (puesto.id === idPuesto) {
        descripcion = puesto.nombre;        
      }
    });
    return descripcion;
  }

  getTotalAnual(idPuesto): number {
    // variable que almacena el valor de la horas anuales 
    let horas_anuales = null;     
    this.informacion.puestos.forEach((puesto) => {
      // busca el puesto para obtener las horas anuales que tiene asignadas    
      if (puesto.id === idPuesto) {
        horas_anuales = puesto.horas_anuales;
      }
    });
    return horas_anuales;
  }

  getPromedioHoras(idPuesto): number {
    // variable que almacena el valor promedio horas por mes para el puesto 
    let promedio_horas = null;     
    this.informacion.puestos.forEach((puesto) => {    
      // busca el puesto para obtener su promedio de horas
      if (puesto.id === idPuesto) {
        promedio_horas = puesto.promedio_horas;
      }
    });
    return promedio_horas;
  }

  getHorasAutorizadasMesAnterior(idPuesto): number {
    let horas_autorizadas_mes_anterior = null;     
    this.informacion.puestos.forEach((puesto) => {    
      // busca el puesto para obtener su promedio de horas
      if (puesto.id === idPuesto) {
        horas_autorizadas_mes_anterior = puesto.horas_autorizadas_mes_anterior;
      }
    });
    return horas_autorizadas_mes_anterior;
  }

  getPromedioSalarial(idPuesto): number {
    // variable que almacena el promedio salarial del puesto 
    let promedio_salarial = null;
    this.informacion.puestos.forEach((puesto) => {
      // busca el puesto para obtener el promedio salarial    
      if (puesto.id === idPuesto) {
        promedio_salarial = puesto.promedio_salarial;
      }
    });
    return promedio_salarial;
  }


}
