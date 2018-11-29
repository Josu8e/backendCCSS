import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalAutorizarComponent } from '../modal-autorizar/modal-autorizar.component';
import { SolicitudService } from "../solicitud.service";
import { ModalRetroalimentacionComponent } from '../modal-retroalimentacion/modal-retroalimentacion.component';
import {ToasterManagerService} from '../../../../@core/toast/toaster-manager.service';
import {configToasterManager} from '../../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';
import { ModalObservacionesComponent } from '../modal-observaciones/modal-observaciones.component';
import { ModalConfirmacionService } from '../../../../componentes-globales/modal-confirmacion/modal-confirmacion.service';

@Component({
  selector: 'ngx-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
})
export class AdministracionComponent implements OnInit {

  //configuración del toaster para notificaciones
  private config = configToasterManager;
  // cambiar esto por la fecha que trae la solicitud
  private fechaActual: Date = new Date();
  private fechaAnterior: Date = new Date();
  // id recibido por parametro en la ruta
  private idHEMesualServicio;
  // lista de solicitudes por puesto
  private solicitudesHePuesto;
  // retroalimentacion hacia las observaciones
  private rObservaciones="";
  // datos del servidor
  private informacion;
  // variables que almacenan datos informativos para la solicitud, se usan para evitar
  // errores en consola por peticiones asincrónas
  private nombreServicio = "";
  private solicitante = "";
  private observaciones = "";
  // opciones del modal, permite que solo se pueda cerrar el modal al precionar los botones destinados para eso
  private modalOption: NgbModalOptions = {};
  //evita que el usuario presione más de una vez el botón de enviar
  private estado = false;


  constructor( private _route:ActivatedRoute, private modalService: NgbModal,
     private solicitudService: SolicitudService, private toasterManagerService:ToasterManagerService,
    private modalConfirmacionService:ModalConfirmacionService, private _router:Router) { }

  ngOnInit() {  
    // recupera el id de la solicitud seleccionada en la vista 'listar'
    this.idHEMesualServicio = +this._route.snapshot.paramMap.get('id');
    // llamada al servidor que recupera la información de la
    // solicitud del servicio con el id igual a idHEMesualServicio
    this.solicitudService.getAdministracionInfo(this.idHEMesualServicio).subscribe(
      (info) => {
        this.informacion = info;
        this.solicitudesHePuesto = this.informacion.puestos;
        
        this.solicitudesHePuesto.map( solicitud => solicitud.horas_autorizadas = solicitud.horas_solicitadas);        
        // la fecha se actualiza con la fecha de la solicitud
        //NOTA: los meses en JavaScript empiezan en 0
        var fechaDescompuesta =this.informacion.fecha.split('-');
        this.fechaActual = new Date(fechaDescompuesta[0],fechaDescompuesta[1]-1,fechaDescompuesta[2]);        
        // validación debido a que si el dia es 31 no se obtiene el mes anterior simplemente restando el mes, se debe restar un dia para que funcione
        if (fechaDescompuesta[2] == '31') {
          fechaDescompuesta[2]-=1;
        }
        // se obtiene la fecha correspondiente al mes anterior
        this.fechaAnterior = new Date(fechaDescompuesta[0],fechaDescompuesta[1]-2,fechaDescompuesta[2]);
        // se llenan los datos informativos
        this.nombreServicio = this.informacion.nombre_servicio;
        this.solicitante = this.informacion.jefe_servicio;
        this.observaciones = this.informacion.observaciones; 
        this.informacion.puestos.forEach(solicitud => {
          if (solicitud.horas_autorizadas_mes_anterior == 0) {
            this.toasterManagerService.makeToast('warning', 'Advertencia', `El '${solicitud.nombre_puesto}' no cuenta con horas autorizadas para el mes anterior. Se ha puesto un 0 por defecto.`);  
          }
        });
      },
      (error) =>{
        this.toasterManagerService.makeToast('error', 'Error', 'No se pudieron recuperar los datos necesarios para la solicitud.')
        this.estado = true;
      }
    );
  }
  
  errorHandler(error, envia){
    switch (error.status) {
      // el servidor no se encuentra disponible
      case 0: {
        this.toasterManagerService.makeToast('error', 'Error', 'Error en la conexion con el servidor.');
        break;  
      }default:{
        if(envia){
          this.toasterManagerService.makeToast('error', 'Error', 'No se han podido guardar los cambios hechos.') 
        }else{
          this.toasterManagerService.makeToast('error', 'Error', 'No se pudieron recuperar los datos necesarios para la solicitud.');
        }
        break;
      }
    }
  }

  // llamada al modal donde se realiza la autorización de las horas
  autorizar(){
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';
    const modalRef = this.modalService.open(ModalAutorizarComponent, this.modalOption);
    // Parámetros que se le envía al modal
    modalRef.componentInstance.solicitudesHePuesto = this.solicitudesHePuesto;
    // crea un promise que se dispara al cerrar el modal 
    modalRef.result.then( datos => {
      this.solicitudesHePuesto = datos;
    },
      // función que se llama al descartar el modal, se usa para no generar error en la consola
      ()=>{}
    );
  }

  // llamada al modal que realiza la retroalimentación de la solicitud
  retroalimentacion(idPuesto){
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    const modalRef = this.modalService.open(ModalRetroalimentacionComponent,this.modalOption);
    // parámetros que recibirá el modal
    modalRef.componentInstance.idPuesto = idPuesto;
    modalRef.componentInstance.solicitudesHePuesto = this.solicitudesHePuesto;
    modalRef.result.then(respaldo => {
      this.solicitudesHePuesto.forEach(solicitud => {
        if (solicitud.id_puesto === idPuesto) {
          solicitud.retroalimentacion = respaldo;
        }
      });
    })
  }
  
  // funcion que realiza las acciones necesarias para rechazar una solicitud  
  rechazarSolicitud(){
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Realmente desea rechazar esta solicitud?')
    .then((confirmed) => {
      if (confirmed) {
        let hayRetroalimentacion = false;
        for (let index = 0; index < this.solicitudesHePuesto.length; index++) {
          if(this.solicitudesHePuesto[index].retroalimentacion){
            hayRetroalimentacion = true;
          }
        }
        // si entra aqui indica que si se digitó un retroalimentación para al menos un puesto de la solicitud
        if (!hayRetroalimentacion){      
          if (this.rObservaciones.length == 0) {
            this.toasterManagerService.makeToast('error','Error',"No se puede rechazar una solicitud sin retroalimentación");
          }else{
            this.rechazar();
          }
        // si no se digitó una retroalimentación en ningun puesto de la solicitud
        }else{
          this.rechazar();
        }
      }
    });    
  }

  rechazar(){
    const solicitudes =  this.solicitudesHePuesto.map( solicitud => (
      {
        id: solicitud.id_puesto,
        retroalimentacion: solicitud.retroalimentacion,
        id_he_mensual_puestos: solicitud.id_he_mensual_puestos
      }
    ));
    const object = `{"id_he_mensual_servicio":"${this.idHEMesualServicio}","estado":"D","observaciones":"${this.rObservaciones}","solicitudes":${JSON.stringify(solicitudes)}}`;
    this.solicitudService.putAdministracionRechazar(JSON.parse(object)).subscribe(
      ()=>{
        this.toasterManagerService.makeToast('success','Solicitud Rechazada',"La solicitud actual ha sido rechazada, el jefe de servicio podrá ver la retroalimentación hecha.");
        this.estado = true;
        this._router.navigate(['stepi/horas-extra/solicitud/listar-administracion']);
      },
      (error)=>this.toasterManagerService.makeToast('error','Error',"No se ha podido rechazar la solicitud actual.")
    );
    //console.log(JSON.parse(object));
  }

  // funcion que realiza las acciones necesarias para aprobar una solicitud
  aprobarSolicitud(){
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Realmente desea aprobar esta solicitud?')
    .then((confirmed) => {
      if (confirmed) {
        for (let index = 0; index < this.solicitudesHePuesto.length; index++) {
          if(!this.solicitudesHePuesto[index].horas_autorizadas) {
            this.toasterManagerService.makeToast('warning','Faltante',"No se puede aprobar una solicitud hasta que se autoricen horas para todos los puestos");       
            return;
          }
        }
        const solicitudes =  this.solicitudesHePuesto.map( solicitud => (
          {
            id_puesto: solicitud.id,
            horas_autorizadas: solicitud.horas_autorizadas,
            id_he_mensual_puestos: solicitud.id_he_mensual_puestos
          }
        ));
        
        const object = `{"id_he_mensual_servicio":"${this.idHEMesualServicio}","estado":"PP","observaciones":"${this.observaciones}","solicitudes":${JSON.stringify(solicitudes)}}`;
        this.solicitudService.putAdministracionAprobar(JSON.parse(object)).subscribe(
          ()=>{
            this.toasterManagerService.makeToast('success','Completado',"El proceso de autorización de horas se realizó exitosamente.");
            this.estado = true;
            this._router.navigate(['stepi/horas-extra/solicitud/listar-administracion']);
          },
          (error)=> this.toasterManagerService.makeToast('error','Error',"El proceso de autorización de horas no ha podido realizarse.")
        ); 
      }
    }); 
  }

  retroalimentacionObservaciones(){
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    const modalRef = this.modalService.open(ModalObservacionesComponent,this.modalOption);
    modalRef.componentInstance.retroalimentacion = this.rObservaciones;
    modalRef.result.then( valor =>{
      this.rObservaciones = valor;
    });
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
      console.log(`puesto.id: ${puesto.id} || idPuesto: ${idPuesto}`);
       
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
