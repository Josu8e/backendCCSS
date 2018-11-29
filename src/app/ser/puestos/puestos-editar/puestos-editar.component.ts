import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
// models
import { Servicio } from '../../models/Servicio';
import { Puesto } from '../../models/Puesto';

// services
import { PuestosService } from '../puestos.service';
import { ServiciosService } from '../../servicios/servicios.service';


// toast
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';


@Component({
  selector: 'ngx-puestos-editar',
  templateUrl: './puestos-editar.component.html',
  styleUrls: ['./puestos-editar.component.scss'],
})
export class PuestosEditarComponent implements OnInit {

  config = configToasterManager;
  editarForm: FormGroup;
  servicios: Servicio[];
  puesto: Puesto;

  /*
  puesto que se quiere editar,
  se utiliza para cargar los datos del formulario
  */

  @Input() puestoEditar: Puesto;
  urlViewError: string;

  constructor(formBuilder: FormBuilder, private puestosService: PuestosService,
    private serviciosService: ServiciosService,
    private activeModal: NgbActiveModal, private _router: Router,
    private toasterManagerService: ToasterManagerService) {

    this.urlViewError = '/ser/puestos/error-handle';
    this.servicios = new Array<Servicio>();
    this.editarForm = formBuilder.group({
      'servicio_input': [''],
      'codigo_input': [''],
      'nombre_input': [''],
      'salario_input': [''],
      'descripcion_input': [''],
    });
  }

  ngOnInit() {
    this.puesto = new Puesto(this.puestoEditar.id, this.puestoEditar.id_servicio,
      this.puestoEditar.nombre, this.puestoEditar.codigo,
      this.puestoEditar.promedio_salarial, this.puestoEditar.descripcion);
    this.puestosCargarServicios();
  }

  /*
  Descripcion: Carga los servicios que se encuentran en la base de datos
  Recibe: recibe una lista de objetos servicio
  Envia: No aplica, se engarda de cargar todos los datos
  */
  puestosCargarServicios() {
    this.serviciosService.serviciosObtenerLista()
      .subscribe(
        success => {
          this.servicios = success;
        },
        err => {
          this._router.navigate([this.urlViewError]);
        },
    );
  }

  /*
  obtiene los datos del formulario y crear un objeto puesto
  con la informacion.
  */
  onSubmit(form: any) {
    const codigo = form.codigo_input;
    const nombre = form.nombre_input;
    const promedio_salarial = form.salario_input;
    const descripcion = form.descripcion_input;
    const id_servicio = form.servicio_input;
    const puesto_temp = new Puesto(this.puesto.id, id_servicio, nombre, codigo, promedio_salarial, descripcion);
    this.puestosEditar(puesto_temp);
  }

  /*
  Descripcion: Se encarga de editar un puesto
  Envia: El puesto que se quiere editar
  Recibe: el puesto con la informacion editada
  */
  puestosEditar(puesto: Puesto) {
    this.puestosService.puestosEditar(puesto)
      .subscribe(
        success => {
          this.puestoEditar = success;
          this.activeModal.close();
          this.toasterManagerService.makeToast('success', 'Puestos', 'Se ha editado el puesto correctamente');
        },
        err => {
          this.activeModal.close();
          this.toasterManagerService.makeToast('error', 'Puestos', 'No se ha editado el puesto correctamente');
        },
    );
  }

  // se encarga de cerrar el modal de editar puesto
  cancelar() {
    this.activeModal.close();
  }
}
