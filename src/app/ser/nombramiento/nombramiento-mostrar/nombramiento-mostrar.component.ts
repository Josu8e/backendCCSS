import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ModificarComponent} from '../modificar/modificar.component';
import {Nombramiento} from '../../models/Nombramiento';
import {NombramientosService} from '../nombramientos.service';
import {CrearNombramientoComponent} from '../crear-nombramiento/crear-nombramiento.component';
import {ToasterManagerService} from '../../../@core/toast/toaster-manager.service';
import 'style-loader!angular2-toaster/toaster.css';
import {configToasterManager} from '../../../@core/toast/config';

@Component({
  selector: 'ngx-nombramiento-mostrar',
  templateUrl: './nombramiento-mostrar.component.html',
  styleUrls: ['./nombramiento-mostrar.component.scss'],
})
export class NombramientoMostrarComponent implements OnInit {
  public servicios: Nombramiento;
  public users: Nombramiento[];
  public nombramiento_e: Nombramiento;
  public variablita: number;
  // Opciones de busqueda en la barra de buscar
  opciones = ['Cedula', 'Código'];
  // Opción por defecto
  opcionSeleccionada: any = 'Código';
  modalOption: NgbModalOptions = {};

  constructor(private modalService: NgbModal, public nomService: NombramientosService,
              public toasterManagerService: ToasterManagerService ) { }
  config= configToasterManager;

  ngOnInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.puestosCargarLista();
  }

  /*
  Descripcion: Funcion que trae la lista de nombramientos para poder llenar la tabla de visualización de todos los
  nombramientos existentes para poder modificarlos o eliminarlo.
  Recibe:
  Envia: Lista con los datos de todos los nombramientos.
  */
  puestosCargarLista(): void {
    this.nomService.getNom()
      .subscribe(
        success => {
          this.users = success;
        },
        err => {
          window.console.log('error')  // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
      );
  }

  abrirModal(nombramiento: Nombramiento, id) {
    const modalRef = this.modalService.open(ModificarComponent, this.modalOption);
    modalRef.componentInstance.nom = nombramiento;
    modalRef.componentInstance.Nombramiento = nombramiento;
    modalRef.result.then((result) => {
      this.puestosCargarLista();
    });
  }

  abrirModalCrear() {
    this.modalService.open(CrearNombramientoComponent, this.modalOption).result.then((result) => {
      this.puestosCargarLista();
    });
  }
  eliminarOficial() {
    this.nomService.eliminarNombramiento(this.variablita)
      .subscribe(
        success => {
          this.nombramiento_e = success;
          this.toasterManagerService.makeToast('success', '¡Éxito!', 'Se ha eliminado correctamente el nombramiento.');
          this.puestosCargarLista();
        },
        err => {
          this.toasterManagerService.makeToast('error', '¡Fallo!', 'No se ha eliminado correctamente el nombramiento.');
        },
      );
    this.variablita = 0;
  }
  openWindowCustomClass(content, code) {
    this.variablita = code;
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}
