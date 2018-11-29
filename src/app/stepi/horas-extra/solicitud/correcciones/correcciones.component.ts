import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from '../solicitud.service';
import { ModalCorreccionesComponent } from '../modal-correcciones/modal-correcciones.component';
import { ToasterManagerService} from '../../../../@core/toast/toaster-manager.service';
import { configToasterManager} from '../../../../@core/toast/config';
import { AuthService } from "../../../../auth/auth.service";
import { Funcionario } from '../../../../auth/funcionario';
import { ModalModificarComponent } from '../modal-modificar/modal-modificar.component';
import { ModalConfirmacionService } from '../../../../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-correcciones',
  templateUrl: './correcciones.component.html',
  styleUrls: ['./correcciones.component.scss']
})
export class CorreccionesComponent implements OnInit {

  // datos del servidor
  private informacion;
  // esta variable recupera los valores de respaldo del modal en caso de descarte
  private respaldo;
  //evita que el usuario presione más de una vez el botón de enviar
  private estado = false;
  // definición de las fechas 
  private fechaActual: Date = new Date();
  private fechaAnterior: Date = new Date();
  // lista de solicitudes por puesto
  private solicitudesHePuesto=[];
  // aquí se almacenarán las observaciones realizadas (CAMBIAR POR LOS DATOS QUE TRAEN DEL SERVER)
  private observaciones;
  // filas que se mostrarán en la vista, se usan para usar llamada a funciones con llaves
  // de interpolación, pues generan más llamadas que las requeridas, sobrecargando la página
  private filas;
  // id de la solicitud por servicio
  private idHEMesualServicio;
    // variables que almacenan datos informativos para la solicitud, se usan para evitar
  // errores en consola por peticiones asincrónas
  private nombreServicio = "";
  private cantPuestos;
  private funcionario:Funcionario;
  private idServicio;
  private jefeServicio="";
  private retroAlimentacionObservaciones ="";
  // opciones del modal, permite que solo se pueda cerrar el modal al precionar los botones destinados para eso
  private modalOption: NgbModalOptions = {};

  constructor(private modalService: NgbModal, private solicitudService: SolicitudService,
    private toasterManagerService:ToasterManagerService, private authService:AuthService,
    private modalConfirmacionService:ModalConfirmacionService, private _router:Router) { }

  ngOnInit() {
    // obtención del mes anterior
    this.fechaAnterior.setMonth(this.fechaAnterior.getMonth() - 1);
    // obtención de la lista almacenada en el solicitudService (se compoarte con el componente modal-realizar)
    this.solicitudService.getCorrecciones(this.authService.getUserId()).subscribe(
      (info) =>{
        this.informacion = info;
        this.solicitudService.actualizarPuestos(Object.assign([],this.informacion.servicio.puestos));
        // la fecha se actualiza con la fecha de la solicitud
        //NOTA: los meses en JavaScript empiezan en 0
        var fechaDescompuesta =this.informacion.servicio.fecha.split('-');
        this.fechaActual = new Date(fechaDescompuesta[0],fechaDescompuesta[1]-1,fechaDescompuesta[2]);        
        // validación debido a que si el dia es 31 no se obtiene el mes anterior simplemente restando el mes, se debe restar un dia para que funcione
        if (fechaDescompuesta[2] == '31') {
          fechaDescompuesta[2]-=1;
        }
        // se obtiene la fecha correspondiente al mes anterior
        this.fechaAnterior = new Date(fechaDescompuesta[0],fechaDescompuesta[1]-2,fechaDescompuesta[2]);
        // se obtienen los datos informativos
        this.cantPuestos = info.servicio.puestos.length;
        this.nombreServicio = this.informacion.servicio.nombre;
        this.idServicio = info.servicio.id;  
        this.solicitudesHePuesto = this.informacion.servicio.puestos;  
        this.observaciones = this.informacion.servicio.observaciones; 
        this.idHEMesualServicio = this.informacion.servicio.id_he_mensual_servicio;
        this.retroAlimentacionObservaciones = this.informacion.servicio.retroalimentacion;
        this.informacion.servicio.puestos.forEach(solicitud => {
          if (solicitud.horas_autorizadas_mes_anterior == 0) {
            this.toasterManagerService.makeToast('warning', 'Advertencia', `El '${solicitud.nombre}' no cuenta con horas autorizadas para el mes anterior. Se ha puesto un 0 por defecto.`);  
          }
        });
      }, 
      //en caso de que ocurra un error debido al false envia el mensaje de error de cuando se reciben datos
      (error) =>{
        this.errorHandler(error, false);
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
      }
      case 404:{
        this.toasterManagerService.makeToast('error', 'Error', error.error.message);
        break;
      }default:{
        if(envia){
          this.toasterManagerService.makeToast('error', 'Error', 'No se ha podido enviar la solicitud corregida.') 
        }else{
          this.toasterManagerService.makeToast('error', 'Error', 'No se pudo recuperar la lista de solicitudes pendientes de autorización de horas extra.');
        }
        break;
      }
    }
  }


  enviarSolictud() {
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Realmente desea enviar esta solicitud?')
    .then((confirmed) => {
      if (confirmed) {
        // se revisa si todos los puesto asociados al servicio se han incluido en la solicitud
        const solicitudes =  this.solicitudesHePuesto.map( solicitud => (
          {
            justificacion: solicitud.justificacion,
            horas_solicitadas: solicitud.horas_solicitadas,
            cantidad_empleados: solicitud.cantidad_empleados,
            id_he_mensual_puestos: solicitud.id_he_mensual_puestos
          }
        ));
        console.log(this.solicitudesHePuesto);
        
        const object = `{"id_he_mensual_servicio":"${this.idHEMesualServicio}","observaciones":"${this.observaciones}","estado":"PA","solicitudes":${JSON.stringify(solicitudes)}}`;
        console.log(object);
        this.solicitudService.putCorrecciones(JSON.parse(object)).subscribe(
          ()=>{
            this.toasterManagerService.makeToast('success', 'Solicitud Realizada', 'La solicitud fue enviada exitosamente.');
            this.estado = true;
            this._router.navigate(['/stepi/dashboard']);
          },//en caso de que ocurra un error debido al true envia el mensaje de error para el envio de datos
            (error)=> this.errorHandler(error, true)
        );
      }
    });
  }
    

  // función que abre el modal para realizar la inserción de datos
  abrirModal(idPuesto) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    const modalRef = this.modalService.open(ModalModificarComponent, this.modalOption);
    // parámetro que recibe el modal, indica el puesto seleccionado en caso de edición
    modalRef.componentInstance.idPuesto = idPuesto;
    this.solicitudesHePuesto.forEach(solicitud => {
      if (idPuesto === solicitud.id) {
        modalRef.componentInstance.solicitudActual = solicitud;
      }
    }); 
    
    // genera el promise que recupera la lista del nuevo registro creado en el modal-realizar
    modalRef.result.then(
      (datos) => {
        // actualiza los datos ya sea con respaldo con los nuevos datos
        this.restablecerValores(datos,idPuesto);
      },
      ()=>{}
    );
  }

  // función que restablece los valores originales en caso de descartar una modificación
  restablecerValores(respaldo:any, idPuesto:number){
    this.filas = this.solicitudesHePuesto;
    this.filas.forEach(fila => {
      if (fila.id === idPuesto) {
        fila.cantidad_empleados = respaldo.cantidad_empleados;
        fila.justificacion = respaldo.justificacion;
        fila.horas_solicitadas = respaldo.horas_solicitadas;
      }
    });
  }

  verRetroalimentacion(retroalimentacion) {
     // Si la retroalimentación viene vacía
     if (retroalimentacion === null || !retroalimentacion.trim()) {
      //alert("Entró");
      //this.toasterManagerService.makeToast('error', 'Error de servidor', 'No se pudieron recuperar los datos necesarios para la solicitud.');
      //No se ha hecho ninguna retroalimentación al elemento seleccionado.
      this.toasterManagerService.makeToast('warning','No hay retroalimentación','No se ha hecho ninguna retroalimentación al elemento seleccionado.');
      return;
    }
    const modalRef = this.modalService.open(ModalCorreccionesComponent);
    modalRef.componentInstance.retroalimentacion = retroalimentacion;
  }

}
