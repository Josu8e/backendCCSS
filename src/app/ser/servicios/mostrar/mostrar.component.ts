import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ServiciosCrearComponent} from '../servicios-crear/servicios-crear.component';
import {ServiciosModificarComponent} from '../servicios-modificar/servicios-modificar.component';
import {ServiciosService} from '../servicios.service';
import {Servicio} from '../../models/Servicio';
import {ToasterManagerService} from '../../../@core/toast/toaster-manager.service';
import {configToasterManager} from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-mostrar',
  templateUrl: `./mostrar.component.html`,
  styleUrls: ['./mostrar.component.scss'],
})
export class MostrarComponent implements OnInit {
  public varEliminar: number;
  public servicios: Servicio[];
  public serviciosE: Servicio;
  closeResult: string;
  config= configToasterManager;
  modalOption: NgbModalOptions = {};
  // Opciones de busqueda.
  opciones = ['Codigo Servicio', 'Nombre Servicio'];
  // Opcion por default.
  opcionSeleccionada: any = 'Codigo Servicio';


  constructor(private modalService: NgbModal, public serviciosService: ServiciosService,
              private toasterManagerService: ToasterManagerService) { }

  ngOnInit() {
    // se obtiene todos los servicios
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.cargar();
  }
  /*
  Descripcion: funcion que trae todos los servicios
  Recibe: no se recibe ningun parametro
  Envia: todos los servicios que esten en la base de datos
  */
  cargar() {
    this.serviciosService.getServicios().subscribe(servicios => {
      this.servicios = servicios;
    })
  }
  /*
    Descripcion: utilizado para abrir el modal de crear servicios
    Recibe: no recibe ningun parametro
    Envia:carga el modal de crear servicios y actualiza la tabla
    */
  abrirModalCrear() {
    this.modalService.open(ServiciosCrearComponent, this.modalOption).result.then((result) => {
      this.cargar();
    });
  }
  /*
   Descripcion: utilizado para abrir el modal de modificar servicios
   Recibe: recibe el servicio que se va a modificar en conjunto con el id del mismo
   Envia:carga el modal de modificar servicios y actualiza la tabla
   */
  abrirModalModificar(servicio: Servicio, id) {
    this.serviciosService.selectServicios = servicio;
    this.modalService.open(ServiciosModificarComponent, this.modalOption).result.then((result) => {
      this.cargar();
    });
  }
  /*
  Descripcion:utilizado para abrir el modal de eliminar servicios
  Recibe: la notificacion de si desea eliminar en conjunto con el codigo del servicio a eliminar
  Envia:abre el modal
  */
  abrirModalEliminar(content, codigo) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /*
  Descripcion:funcion para cerrar de distintas formas el modal de eliminar
  Recibe: la razon
  Envia: distintas formas de cerrar el modal
  */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  /*
  Descripcion: funcion que se encarga de eliminar el servicio
  Recibe: no recibe ningun parametro
  Envia:el exito o el fallido de la eliminacion
  */
  eliminarOficial() {
    this.serviciosService.eliminarServicio(this.varEliminar)
      .subscribe(
        success => {
          this.serviciosE = success;
          // console.log ('resultado: ' + this.serviciosE)
          this.toasterManagerService.makeToast('success', 'Éxito', 'Se ha eliminado correctamente el servicio.');
          this.cargar();
        },
        err => {

          this.toasterManagerService.makeToast('error', 'Fallo', 'No se ha eliminado correctamente el servicio, tiene puestos asociados');

          /*console.log ('error en crear') */
          // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
      );
    this.varEliminar = 0;
  }
  /*
  Descripcion:funcion utilizada para abrir el modal de eliminar
  Recibe: recibe la notificacion a abrir y el id del servicio a eliminar
  Envia:abrir la notificacion
  */
  openWindowCustomClass(content, code) {
    this.varEliminar = code;
    // console.log("code: " + this.varEliminar)
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

}
