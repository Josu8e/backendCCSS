import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';

// models
import { Nombramiento } from '../../models/Nombramiento';
import { Elegible } from '../../models/Elegible';
import { Puesto } from '../../models/Puesto';
// services
import { NombramientosService } from '../../nombramiento/nombramientos.service';
import { PuestosService } from '../../puestos/puestos.service';
// toast
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import 'style-loader!angular2-toaster/toaster.css';

// Validators
import { VerificarNombreSustituto } from '../Validators/verificarSustituto.component';

@Component({
  selector: 'ngx-nombrar-elegibles',
  templateUrl: './nombrar-elegibles.component.html',
  styleUrls: ['./nombrar-elegibles.component.scss'],
})

export class NombrarElegiblesComponent implements OnInit {

  // nombramiento por crear
  nombramiento: Nombramiento;
  // form
  crearForm: FormGroup;
  urlViewError: string;

  // sustituye_input: autocomplete
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  modelFuncionarios: any;

  /************************************************
  ****** valores por defecto del nombramiento *****
  *************************************************/

  // primeros elementos del select
  tipoNombramiento = 'Interino';
  tiempoLaboralNombramiento = 'Medio';
  motivoNombramiento = 'Vacaciones';
  // opciones de select
  listaTipos = ['Interino', 'Propiedad'];
  listaTiempos = ['Medio', 'Completo'];
  listaMotivos = ['Vacaciones', 'Dia libre', 'Incapacidad', 'Permiso sin gose de salario',
                  'Permniso con gose de salario','Huelga','Ascenso interino','Suspensión']

  // se obtiene en el backend
  idNombramiento = null;
  cantidadDiasNombramiento = 0;
  estadoNombramiento = true;

  // se obtiene por el usuario
  funcionarioASustituir = null;


  /***************************************************
  ** informacion de elegibles-mostrar.component.ts ***
  ****************************************************/

  @Input() elegible: Elegible;
  @Input() fechaInicio: string;
  @Input() fechaFinal: string;
  @Input() idPuesto: string;
  @Input() listaNombresFuncionarios: Array<string>;
  @Input() estadoFuncionario: Boolean;

  nombreCompleto: string;
  puesto: Puesto;

  constructor(private nombramientoService: NombramientosService, private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal, private puestosService: PuestosService,
    private _router: Router, private toasterManagerService: ToasterManagerService) {

    this.puesto = new Puesto(null, null, '', null, null, null);
  }
  ngOnInit() {
    this.crearForm = this.formBuilder.group({
      'sustituye_input':
        ['', [Validators.required,
        VerificarNombreSustituto.verificarNombre(this.listaNombresFuncionarios),
        Validators.maxLength(70)]],
      'tiempo_input': ['', [Validators.required, Validators.maxLength(50)]],
      'tipo_input': ['', [Validators.required, Validators.maxLength(30)]],
      'motivo_input': ['', [Validators.required, Validators.maxLength(50)]],
    });

    this.urlViewError = '/ser/elegibles/error-handle';
    this.actualizarDatosNombramiento();
    this.obtenerInfoPuesto();
    this.verificarAdvertencia();
  }

  /*
  Verifica si el estado del funcionario es ocupado o disponible
  Si el funcionario esta ocupado despliega advertencia de posible
  creacion de nombremiento superpuesto
  */
  verificarAdvertencia() {
    if (this.estadoFuncionario != true) {
      this.toasterManagerService.makeToast('warning', '¡Atención!',
        'El usuario no esta disponible. Se realizara un nombramiento superpuesto');
    }
  }

  /*
  Descripcion: Se encarga de obtener la informacion completa de un puesto,
  segun el id de puesto enviado
  Envia: El id del puesto que se quiere analizar
  Recibe: Un objeto de tipo puesto, correspondiente al puesto
  que se busco en la base de datos
  */
  obtenerInfoPuesto() {
    const id = parseInt(this.idPuesto, 10);
    this.puestosService.puestosObtenerInfoPuesto(id)
      .subscribe(
        success => {
          this.puesto = success;
        },
        err => {
          this.cancelar();
          this._router.navigate([this.urlViewError]);
        },
    );
  }

  /*
  Se crea una representacion de nombramiento para trabajar sus valores
  en la vista (antes de que el usuario realice submit)
  */
  actualizarDatosNombramiento() {
    this.nombramiento = new Nombramiento(this.idNombramiento, this.idPuesto,
      this.elegible.cedula, this.fechaInicio, this.fechaFinal,
      this.cantidadDiasNombramiento, this.tiempoLaboralNombramiento,
      this.tipoNombramiento, this.funcionarioASustituir,
      this.motivoNombramiento, this.estadoNombramiento);
      this.nombreCompleto = this.elegible.nombre;
  }

  /*
  obtiene los datos del formulario y actualiza
  los datos del objeto de nombramiento creado. Llama
  a la funcion de crear nombramiento
  */
  onSubmit(form: any) {
    this.nombramiento.sustituye = form.sustituye_input;
    this.nombramiento.motivo = form.motivo_input;
    this.nombramiento.tiempo = form.tiempo_input;
    this.nombramiento.tipo = form.tipo_input;
    console.log("Aceptar submit");
    console.log(this.nombramiento);
    this.crearNombramiento();
  }

  /*
  EL SIGUIENTE PROCEDIMIENTO *NO* ES PARTE DE ELEGIBLES, SE REALIZO UNA
  REUTILIZACION DDE CODIGO DEL MODULO DE NOMBRAMIENTO. SOLO SE HACE
  UN LLAMADO AL SERVICE DEL MODULO. CUALQUIER MODIFICACION SE REALIZA
  EN EL SERVICE DEL MODULO NOMBRAMIENTO

  Descripcion: Se encarga de crear un nombramiento
  Envia: El nombramiento que se desea crear
  Recibe: El nombramiento que se creo en la base
  */
  crearNombramiento() {
    this.nombramientoService.nombramientoCrear(this.nombramiento)
      .subscribe(
        success => {
          this.nombramiento = success;
          this.activeModal.close();
          this.toasterManagerService.makeToast('success', 'Éxito', 'El nombramiento se creó con éxito');
        },
        err => {
          this.activeModal.close();
          this.toasterManagerService.makeToast('error', '¡Atención!', 'Error en la creación del nombramiento.');
          console.log(err);
        },
    );
  }

  // cierra el modal de crear nombramiento
  cancelar() {
    this.activeModal.close();
  }

  /*
  El siguiente procedimiento se encarga de hacer un autocomplete
  del input de funcionario a sustituir (html).

  Muestra una lista de las opciones disponibles,
  segun lo digitado por el funcionario
  */
  searchFuncionarios = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      merge(this.focus$),
      merge(this.click$.pipe(filter(() => !this.instance.isPopupOpen()))),
      map(term => (term === '' ? this.listaNombresFuncionarios
        : this.listaNombresFuncionarios.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
    );
}
