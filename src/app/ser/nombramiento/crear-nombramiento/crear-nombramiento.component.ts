import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Nombramiento } from '../../models/Nombramiento';
import { NombramientosService } from '../nombramientos.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import 'style-loader!angular2-toaster/toaster.css';
import { configToasterManager } from '../../../@core/toast/config';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs/operators';

@Component({
  selector: 'ngx-crear-nombramiento',
  templateUrl: './crear-nombramiento.component.html',
  styleUrls: ['./crear-nombramiento.component.scss'],
})



export class CrearNombramientoComponent implements OnInit {


  public nombramientos: Nombramiento;
  crearForm: FormGroup;
  config = configToasterManager;
  public listaNom: Nombramiento[];
  public datoEstado;
  private nombramientoVar: Nombramiento;
  public confirmation;
  public varNombramientoS: number;
  public code;
  public var_content: NgbModal;

  texto = '';

  // arreglo con identificacion de todos los funcionarios del sistema
  public listaFuncionariosCedula = [];

  public listaFuncionariosCedulaYNombre = [['1', 'Mauro'], ['2', 'Michael'], ['3', 'Masiel'], ['4', 'Naty']];

  // nombre, apellidos
  public listaFuncionariosNombreApellidos = [];

  // codigo puesto a nombrar
  public listaCodigoPuestoNombrar = [];


  model: any;

  @ViewChild('instance') instance: NgbTypeahead;
  @ViewChild('instance') inst: NgbTypeahead;
  @ViewChild('instance') instanceCodigoPuesto: NgbTypeahead;

  focusCedulaFuncionarioNombrar$ = new Subject<string>();
  clickCedulaFuncionarioNombrar$ = new Subject<string>();

  focusNombreFuncionarioSustituir$ = new Subject<string>();
  clickNombreFuncionarioSustituir$ = new Subject<string>();

  focusCodigoPuesto$ = new Subject<string>();
  clickCodigoPuesto$ = new Subject<string>();



  /*
    search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        merge(this.focus$),
        merge(this.click$.pipe(filter(() => !this.instance.isPopupOpen()))),
        map(term => (term === '' ? states
          : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );*/

  busquedaCedulas = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      merge(this.focusCedulaFuncionarioNombrar$),
      merge(this.clickCedulaFuncionarioNombrar$.pipe(filter(() => !this.instance.isPopupOpen()))),
      // map(term => (term === '' ? this.listaFuncionariosCedula
      map(inputEnVista => (inputEnVista === '' ? this.listaFuncionariosCedula :
        // this.listaFuncionariosCedula.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
        this.listaFuncionariosCedula.filter(v => v.indexOf(inputEnVista.toLowerCase()) > -1)).slice(0, 10)),
    );


  busquedaNombreApellidos = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      merge(this.focusNombreFuncionarioSustituir$),
      merge(this.clickNombreFuncionarioSustituir$.pipe(filter(() => !this.inst.isPopupOpen()))),
      map(term => (term === '' ? this.listaFuncionariosNombreApellidos :
        this.listaFuncionariosNombreApellidos.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
    );

  busquedaCodigoPuestos = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      merge(this.focusCodigoPuesto$),
      merge(this.clickCodigoPuesto$.pipe(filter(() => !this.instanceCodigoPuesto.isPopupOpen()))),
      map(term => (term === '' ? this.listaCodigoPuestoNombrar :
        this.listaCodigoPuestoNombrar.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
    );

  constructor(formBuilder: FormBuilder, public nomService: NombramientosService, private nombramientosService: NombramientosService,
    public toasterManagerService: ToasterManagerService, public activeModal: NgbActiveModal, public modalService: NgbModal) {
    this.crearForm = formBuilder.group({

      'cedula_input': [''],
      'sustituye_input': [''],
      'id_puesto_input': [''],
      'fecha_inicio_input': [''],
      'fecha_fin_input': [''],
      'tiempo_input': [''],
      'tipo_input': [''],
      'motivo_input': [''],

    });
  }
  onSubmit(form: any) {
    const cedula = form.cedula_input;
    const sustituye = form.sustituye_input;
    const id_puesto = form.id_puesto_input;
    const fecha_inicio = form.fecha_inicio_input;
    const fecha_fin = form.fecha_fin_input;
    const tiempo = form.tiempo_input;
    const tipo = form.tipo_input;
    const motivo = form.motivo_input;

    window.console.log(sustituye);
    window.console.log(id_puesto);
    window.console.log(fecha_fin);
    window.console.log(fecha_inicio);
    window.console.log(tiempo);
    window.console.log(tipo);
    window.console.log(motivo);

    const nombramiento = new Nombramiento(null, id_puesto, cedula, fecha_inicio, fecha_fin, 1, tiempo, tipo, sustituye, motivo, true);
    if (fecha_inicio > fecha_fin) {
      this.toasterManagerService.makeToast('warning', '¡Atención!',
        'La fecha de inicio del nombramiento no puede ser mayor a la fecha final del mismo');
      // console.log('Errorrr')
    } else {
      this.nombramientoVar = nombramiento;
      // window.console.log(nombramiento);
      this.verificarNombramiento(cedula, fecha_inicio);
      // window.console.log(nombramiento);
    }
  }
  nombramientosCrear(nombramiento: Nombramiento) {
    window.console.log(nombramiento);
    this.nombramientosService.nombramientoCrear(nombramiento)
      .subscribe(
        success => {
          this.nombramientos = success;
          window.console.log('resultado: ' + this.nombramientos);
          this.activeModal.close();
          this.toasterManagerService.makeToast('success', 'Éxito', 'El nombramiento se creó con éxito');
          // window.location.reload();
        },
        err => {
          window.console.log('error en crear');
          this.toasterManagerService.makeToast('warning', '¡Atención!', 'Hubo un error a la hora de crear el nombramiento.');

          // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
    );
  }

  ngOnInit(): void {

    this.funcionariosCargarLista();
    this.funcionariosNombreApellidoCargarLista();
    this.puestosCodigo();

    // window.console.log(this.listaFuncionarios);

    // listaFuncionatiosCedula
    /*
    for (var i = 0; i< this.listaFuncionarios.length; i++ ){
      window.console.log(this.listaFuncionarios[i][0]);
      this.listaFuncionariosCedula.push(this.listaFuncionarios[i][0]);
    }
    window.console.log('Fin del ciclo');

    window.console.log(this.listaFuncionariosCedula); */

  }
  /*
  Descripcion:
  Recibe:
  Envia:
  */
  cancelar() {
    this.activeModal.close();
  }

  // carga lista de funcionarios -> identificador
  funcionariosCargarLista(): void {
    this.nomService.funcionariosObtenerCedulasLista()
      .subscribe(
        success => {
          // window.console.log(' funcionaris cargar lista ---------->');
          // window.console.log(this.listaFuncionariosCedula);
          // window.console.log(success);
          this.listaFuncionariosCedula = success;
          // window.console.log(this.listaFuncionariosCedula);
        },
        err => {
          window.console.log('error en cargar la lista de los funcionarios')  // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
    );
  }
  // lista de los nombres y apellidos de los funconarios del sistema
  funcionariosNombreApellidoCargarLista(): void {
    this.nomService.funcionariosObtenerNombreApellidos()
      .subscribe(
        success => {
          window.console.log(' Nombre-Apellidos funcionarios ---------->');
          // window.console.log(success);
          this.listaFuncionariosNombreApellidos = success;
          // window.console.log(this.listaFuncionariosNombreApellidos);
        },
        err => {
          window.console.log('error en la lista de los func con nombre y apellidos');
          // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
    );
  }
  /*
    Descripcion:funcion que abre la notificacion al preguntar si desea crear nombramiento superpuesto
    Recibe:estado del nombramiento
    Envia:abrir el modal
    */
  openWindowCustomClass(valor) {
    if (valor === 1) {
      this.modalService.open(this.var_content, { windowClass: 'dark-modal' });
    }
  }
  /*
  Descripcion:encargada de llamar a la funcion crear nombramiento
  Recibe: no recibe datos
  Envia:envia el nombramiento
  */
  llama_crear() {
    this.nombramientosCrear(this.nombramientoVar);
  }
  /*
  Descripcion:guardar el modal
  Recibe: estructura del modal completo
  Envia:no se envian datos
  */
  prueba(content) {
    window.console.log('Llego a prueba');
    this.var_content = content;
  }
  /*
  Descripcion:verifica el estado del nombramiento de un funcionario
  Recibe: la cedula del funcionario y la fecha fin del nombramiento
  Envia:obtiene el estado del nombramiento 1 activo 0 inactivo o si se obtuvo algun error
  */
  verificarNombramiento(cedula, fecha_fin) {
    window.console.log(cedula);
    this.nombramientosService.verificaNombramiento(cedula, fecha_fin)
      .subscribe(
        success => {
          this.nombramientos = success;
          window.console.log('entro a verificar');
          this.datoEstado = JSON.stringify(this.nombramientos);
          window.console.log('resultado: ' + this.datoEstado);
          this.activeModal.close();
          if (this.datoEstado === '1') {
            this.openWindowCustomClass(1);
          } else {
            this.nombramientosCrear(this.nombramientoVar);
          }
        },
        err => {
          window.console.log('error en verificar');
          this.toasterManagerService.makeToast('warning', '¡Atención!', 'Hubo un error a la hora de ' +
            'verificar el nombramiento.');
        },
    );
  }

  // lista del codigo de los puestos que existen en el sistema
  puestosCodigo(): void {
    this.nomService.puestosObtenerCodigo()
      .subscribe(
        success => {
          // window.console.log(' Codigo de Puestos ---------->');
          // window.console.log(success);
          this.listaCodigoPuestoNombrar = success;
          // window.console.log(this.listaFuncionariosNombreApellidos);
        },
        err => {
          window.console.log('error en la lista de los func con nombre y apellidos')  // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
    );
  }

}
