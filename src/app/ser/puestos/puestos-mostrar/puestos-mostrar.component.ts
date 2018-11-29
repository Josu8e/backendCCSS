import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
// models
import { PuestoServicio } from '../../models/PuestoServicio';

// services
import { PuestosService } from '../puestos.service';

// componentes
import { PuestosCrearComponent } from '../puestos-crear/puestos-crear.component';
import { PuestosEditarComponent } from '../puestos-editar/puestos-editar.component';

// toast
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';
import { Puesto } from '../../models/Puesto';

@Component({
  selector: 'ngx-puestos-mostrar',
  templateUrl: './puestos-mostrar.component.html',
  styleUrls: ['./puestos-mostrar.component.scss'],
})
export class PuestosMostrarComponent implements OnInit {

  config = configToasterManager;
  // variable de tipo de puesto, temportal para almacenar los datos del usuario
  puestoEliminar: Puesto;
  closeResult: string;
  // lista de puestos
  puestos: PuestoServicio[];
  modalReference: NgbModalRef;
  urlViewError: string;
  // Opciones de busqueda.
  opciones = ['Codigo Puesto', 'Nombre Puesto', 'Nombre Servicio'];
  // Opcion por default.
  opcionSeleccionada: any = 'Codigo Puesto';
  modalOption: NgbModalOptions = {} // not null

  constructor(private puestosService: PuestosService,
    private modalService: NgbModal, private _router: Router,
    private toasterManagerService: ToasterManagerService) {

    this.puestos = new Array<PuestoServicio>();
    this.urlViewError = '/ser/puestos/error-handle';
  }
  ngOnInit() {
    this.puestosCargarLista();

    /*
    bloquea la tecla ESC y el click en el background
    para impedir que se cierre el modal de crear y editar
    El modal solo se puede cerrar por medio de cancelar
    o equis en el modal.
    */
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
  }

  /*
  Descripcion: se encarga de cargar todos los puestos del sistema
  Recibe: Una lista de puestos
  Envia: no aplica, no envia datos
  */
  puestosCargarLista(): void {
    this.puestosService.puestosObtenerLista()
      .subscribe(
        success => {
          this.puestos = success;
        },
        err => {
          this._router.navigate([this.urlViewError]);
        },
    );
  }

  /*
  Se encarga de abrir el modal de crear puesto,
  Envia la lista de puestos.
  Cuando se cierra el modal, activa un refresh de los puestos
  para reflejar los cambios en la tabla de puestos
  */
  puestosAgregar() {
    const modalRef = this.modalService.open(PuestosCrearComponent, this.modalOption);
    modalRef.componentInstance.puestosTemp = this.puestos;
    modalRef.result.then((result) => {
      this.puestosCargarLista();
    });
  }

  /*
  Se encarga de abrir el modal de editar puesto,
  Envia: el puesto que se quiere editar.
  Cuando se cierra el modal, activa un refresh de los puestos
  para reflejar los cambios en la tabla de puestos
  */
  puestosEditar(puesto: Puesto) {
    const modalRef = this.modalService.open(PuestosEditarComponent, this.modalOption);
    modalRef.componentInstance.puestoEditar = puesto;
    modalRef.result.then((result) => {
      this.puestosCargarLista();
    });
  }

  // confirma la eliminacion de un puesto
  puestosEliminar(content: any, puesto: Puesto) {
    this.puestoEliminar = puesto;
    this.abrirModalEliminar(content);
  }

  /*
  Descipcion: Se encarga de eliminar un puesto de la base de datos
  (softdelete)
  Recibe: No aplica
  Envia: Envia el id del puesto que se quiere eliminar
  */
  eliminarPuesto() {
    const posicion = this.puestos.findIndex(
      (func: Puesto) => {
        return func.id === this.puestoEliminar.id;
      },
    );

    this.puestosService.puestosEliminar(this.puestoEliminar.id)
      .subscribe(
        success => {
          this.modalReference.close();
          this.puestos.splice(posicion, 1);
          this.toasterManagerService.makeToast('success', 'Puestos', 'Se ha eliminado el puesto correctamente');
        },
        err => {
          this.toasterManagerService.makeToast('error', 'Puestos', 'No se ha eliminado el puesto correctamente');
        },
    );
  }
  // se encarga de abrir el modal de eliminar puesto
  abrirModalEliminar(content: any) {
    this.modalReference = this.modalService.open(content);
  }
}
