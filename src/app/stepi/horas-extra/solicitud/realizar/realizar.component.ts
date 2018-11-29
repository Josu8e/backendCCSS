import { Component, OnInit } from '@angular/core';
import { ModalRealizarComponent } from '../modal-realizar/modal-realizar.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from '../solicitud.service';
import {ToasterManagerService} from '../../../../@core/toast/toaster-manager.service';
import {configToasterManager} from '../../../../@core/toast/config';
import { AuthService } from "../../../../auth/auth.service";
import 'style-loader!angular2-toaster/toaster.css';
import { Funcionario } from '../../../../auth/funcionario';
import { ModalConfirmacionService } from '../../../../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-realizar',
  templateUrl: './realizar.component.html',
  styleUrls: ['./realizar.component.scss'],
})
export class RealizarComponent implements OnInit {

  //configuración del toaster para notificaciones
  private config = configToasterManager;
  // esta variable recupera los valores de respaldo del modal en caso de descarte
  private respaldo;
  // definición de las fechas 
  private fechaActual: Date = new Date();
  private fechaAnterior: Date = new Date();
  // usado para evitar que el usuario presione varias veces el botón de enviar
  private estado = false;
  // aquí se almacenarán las observaciones realizadas
  private observaciones;
  // datos del servidor
  private informacion;
  // lista de solicitudes por puesto
  private solicitudesHePuesto = [];
  // variables que almacenan datos informativos para la solicitud, se usan para evitar
  // errores en consola por peticiones asincrónas
  private nombreServicio = "";
  private cantPuestos;
  private funcionario:Funcionario;
  private idServicio;
  private jefeServicio="";
  // opciones del modal, permite que solo se pueda cerrar el modal al precionar los botones destinados para eso
  private modalOption: NgbModalOptions = {};

  constructor(private modalService: NgbModal, private solicitudService: SolicitudService,
    private toasterManagerService: ToasterManagerService, private authService: AuthService,
    private modalConfirmacionService: ModalConfirmacionService, private _router:Router) { }

  ngOnInit() {
    // obtención del mes anterior
    if (this.fechaActual.getDate() == 31) {
      this.fechaAnterior.setDate(this.fechaAnterior.getDate()-32);
    }else{
      this.fechaAnterior.setMonth(this.fechaAnterior.getMonth() - 1);
    }
    // recupera datos del servidor
    this.solicitudService.getRealizarInfo(this.authService.getUserId()).subscribe(
        (info) =>{
          if (info.servicio.puestos.length === 0) {
            this.toasterManagerService.makeToast('error', 'Error', 'No existen puestos asociados al servicio. Comuníquese con el administrador del sistema.');
            return;
          }
          this.informacion = info;
          this.solicitudService.actualizarPuestos(Object.assign([],this.informacion.servicio.puestos));
          this.cantPuestos = info.servicio.puestos.length;
          this.nombreServicio = this.informacion.servicio.nombre;
          this.idServicio = info.servicio.id;
          this.informacion.servicio.puestos.forEach(solicitud => {
            if (solicitud.horas_autorizadas_mes_anterior == 0) {
              this.toasterManagerService.makeToast('warning', 'Advertencia', `El puesto '${solicitud.nombre}' no cuenta con horas autorizadas para el mes anterior. Se ha puesto un 0 por defecto.`);
            }
          });     
        }, 
        // si hubo un error al traer los datos del servidor se notifica 'No se pudieron recuperar los datos necesarios para la solicitud.'
        (error) => {
          this.errorHandler(error,false)
          this.estado = true;
        }
    );
    this.funcionario = this.authService.getFuncionario();
    this.jefeServicio = `${this.funcionario.nombre} ${this.funcionario.apellido1} ${this.funcionario.apellido2}`
  }

  errorHandler(error, envia){
    switch (error.status) {
      // el servidor no se encuentra disponible
      case 0: {
        this.toasterManagerService.makeToast('error', 'Error', 'Error en la conexion con el servidor.');
        break;
      // Solicitud repetida
      }case 406:{
        this.toasterManagerService.makeToast('error', 'Error', error.error.message);
        this.estado = true;
        break;
      // no se ha encontrado la informacion requerida
      }case 404:{
        this.toasterManagerService.makeToast('error', 'Error', error.error.message);
        break;
      }default:{
        // error al enviar solicitud
        if (envia) {
          this.toasterManagerService.makeToast('error', 'Error', 'No se ha podido realizar la solicitud de horas extra.');
        }// error al recibir los datos
        else {
          this.toasterManagerService.makeToast('error', 'Error', 'No se han podido recuperar los datos necesarios para realizar la solicitud.');
        }
        break;
      }
    }
  }

  // función que envía los datos de la solicitud
  enviarSolictud() {
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Realmente desea enviar la solicitud?')
        .then((confirmed) => {
          // si se confirma que se desea realizar la acción
          if (confirmed) {
            // en caso de que no se haya seleccionado ningún puesto
            if (this.solicitudesHePuesto.length === 0) {
              this.toasterManagerService.makeToast('error','Error','Debe seleccionar al menos un puesto para enviar la solicitud');
            } else {
              // se contruye el objeto con la lista de solicitudes
              const solicitudes =  this.solicitudesHePuesto.map( solicitud => (
                {
                  id_puesto: solicitud.id_puesto,
                  justificacion: solicitud.justificacion,
                  horas_solicitadas: solicitud.horas_solicitadas,
                  cantidad_empleados: solicitud.cantidad_empleados
                }
              ));
              const object = `{"observaciones":"${this.observaciones}","estado":"PA","jefe_servicio":"${this.jefeServicio}","id_servicio":"${this.idServicio}","solicitudes":${JSON.stringify(solicitudes)}}`;
              console.log(object);
              this.solicitudService.postRealizar(JSON.parse(object)).subscribe(
                ()=>{
                  this.toasterManagerService.makeToast('success', 'Solicitud Realizada', 'La solicitud fue enviada exitosamente.');                  
                  this.estado = true;
                  this._router.navigate(['/stepi/dashboard']);
                },// el true indica que el error se produce al enviar los datos
                (error)=> this.errorHandler(error, true)
              );
            }
          }
    });
  }

  // función que abre el modal para realizar la inserción de datos
  abrirModal(idPuesto) { 
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    const modalRef = this.modalService.open(ModalRealizarComponent, this.modalOption);
    // parámetro que recibe el modal, indica el puesto seleccionado en caso de edición
    modalRef.componentInstance.idPuesto = idPuesto;
    modalRef.componentInstance.solicitudesHePuesto = this.solicitudesHePuesto;
    // genera el promise que recupera la lista del nuevo registro creado en el modal-realizar
    modalRef.result.then(
      (respaldo) => {
        // si no se recibe un respaldo se actualizan los datos
        if (!respaldo) {
          this.solicitudesHePuesto.forEach(fila => {
            fila.nombre = this.getNombrePuesto(fila.id_puesto);
            fila.horas_anuales = this.getTotalAnual(fila.id_puesto);
            fila.promedio_horas = this.getPromedioHoras(fila.id_puesto);
            fila.promedio_salarial = this.getPromedioSalarial(fila.id_puesto);
            fila.horas_autorizadas_mes_anterior = this.getHorasAutorizadasMesAnterior(fila.id_puesto);
          });
        // si se recibe un respaldo es porque el usuario ha descartado los cambios
        // implicando en regresar los datos a su estado original, guardado en el respaldo
        }else{
          this.restablecerValores(respaldo,idPuesto);
        }
      }
    );
  }

  // función que restablece los valores originales en caso de descartar una modificación
  restablecerValores(respaldo:any, idPuesto:number){
    this.solicitudesHePuesto.forEach(fila => {
      if (fila.id_puesto === idPuesto) {
        fila.cantidad_empleados = respaldo.cantidad_empleados;
        fila.justificacion = respaldo.justificacion;
        fila.horas_solicitadas = respaldo.horas_solicitadas;
        fila.horas_autorizadas_mes_anterior = respaldo.horas_autorizadas_mes_anterior;
      }
    });
  }

  // función que elimina una solicitud de la tabla
  eliminar(index) {
    this.solicitudesHePuesto.splice(index,1);
  }

  getNombrePuesto(idPuesto): string { 
    // variable que almacena el valor de la descripción 
    let nombre = null;     
    this.informacion.servicio.puestos.forEach((puesto) => {
      // busca el puesto para obtener su descripción          
      if (puesto.id === idPuesto) {
        nombre = puesto.nombre;        
      }
    });
    return nombre;
  }

  getTotalAnual(idPuesto): number {
    // variable que almacena el valor de la horas anuales 
    let horas_anuales = null;     
    this.informacion.servicio.puestos.forEach((puesto) => {
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
    this.informacion.servicio.puestos.forEach((puesto) => {    
      // busca el puesto para obtener su promedio de horas
      if (puesto.id === idPuesto) {
        promedio_horas = puesto.promedio_horas;
      }
    });
    return promedio_horas;
  }

  getHorasAutorizadasMesAnterior(idPuesto): number {
    let horas_autorizadas_mes_anterior = null;
    this.informacion.servicio.puestos.forEach((puesto) => {    
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
    this.informacion.servicio.puestos.forEach((puesto) => {
      // busca el puesto para obtener el promedio salarial    
      if (puesto.id === idPuesto) {
        promedio_salarial = puesto.promedio_salarial;
      }
    });
    return promedio_salarial;
  }
}