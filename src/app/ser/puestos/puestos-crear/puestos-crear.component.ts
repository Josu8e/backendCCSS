import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
// models
import { Servicio } from '../../models/Servicio';
import { Puesto } from '../../models/Puesto';

// services
import { PuestosService } from '../puestos.service';
import { ServiciosService } from '../../servicios/servicios.service';

// toast
import {ToasterManagerService} from '../../../@core/toast/toaster-manager.service';
import {configToasterManager} from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';

// validators
import { VerificarCodigoPuesto } from '../Validators/verificarCodigoPuesto.component';

@Component({
  selector: 'ngx-puestos-crear',
  templateUrl: './puestos-crear.component.html',
  styleUrls: ['./puestos-crear.component.scss'],
})
export class PuestosCrearComponent implements OnInit {

  config = configToasterManager;
  puesto: Puesto;
  crearForm: FormGroup;
  servicios: Servicio[];
  primerElemento: number;
  urlViewError: string;
  @Input() puestosTemp;

  constructor(private formBuilder: FormBuilder, private puestosService: PuestosService,
    private serviciosService: ServiciosService, private activeModal: NgbActiveModal,
  private _router: Router, private toasterManagerService: ToasterManagerService) {
    this.urlViewError = '/ser/puestos/error-handle';
    this.servicios = new Array<Servicio>();
  }

  ngOnInit() {
    this.puestosCargarServicios();

    // formulario, manejo de validaciones
    this.crearForm = this.formBuilder.group({
      'servicio_input': ['', [Validators.required]],
      'codigo_input': ['', [Validators.required, VerificarCodigoPuesto.verificarCodigo(this.puestosTemp), Validators.maxLength(20)]],
      'nombre_input': ['', [Validators.required, Validators.maxLength(70)]],
      'salario_input': ['', [Validators.required]],
      'descripcion_input': ['', [Validators.required, Validators.maxLength(150)]],
    });
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
          if (this.servicios.length > 0) {
            this.primerElemento = this.servicios[0].id;
          }
        },
        err => {
          this._router.navigate([this.urlViewError]);
        },
      );
  }



  onSubmit(form: any) {
    const codigo = form.codigo_input;
    const nombre = form.nombre_input;
    const promedio_salarial = form.salario_input;
    const descripcion = form.descripcion_input;
    const id_servicio = form.servicio_input;

    const puesto = new Puesto(null, id_servicio, nombre, codigo, promedio_salarial, descripcion);
    this.puestosCrear(puesto);
  }

  /*
  Descripcion: Se encarga de crear el puesto
  Recibe: el puesto creado
  Envia: el puesto que se quiere crear
  */
  puestosCrear(puesto: Puesto) {
    this.puestosService.puestosCrear(puesto)
      .subscribe(
        success => {
          this.puesto = success;
          this.activeModal.close();
          this.toasterManagerService.makeToast('success', 'Puestos', 'Se ha creado el puesto correctamente');
        },
        err => {
          this.activeModal.close();
          this.toasterManagerService.makeToast('error', 'Puestos', 'No se ha creado el puesto correctamente');
        },
      );
  }

  // se encarga de cerrar el modal de crear puesto
  cancelar() {
    this.activeModal.close();
  }
}
