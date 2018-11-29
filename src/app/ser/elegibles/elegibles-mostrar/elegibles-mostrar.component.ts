import { GlobalesService } from './../../../componentes-globales/globales.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

// componentes
import { NombrarElegiblesComponent } from '../nombrar-elegibles/nombrar-elegibles.component';

// services
import { AuthService } from '../../../auth/auth.service';
import { PuestosService } from '../../puestos/puestos.service';
import { ElegiblesService } from '../elegibles.service';

// models
import { Elegible } from '../../models/Elegible';
import { Puesto } from '../../models/Puesto';
import { Servicio } from '../../models/Servicio';

// toast
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-elegibles-mostrar',
  templateUrl: './elegibles-mostrar.component.html',
  styleUrls: ['./elegibles-mostrar.component.scss'],
})


export class ElegiblesMostrarComponent implements OnInit {


  /******************************
   * INFORMACION SEGUN PERMISOS *
   * ****************************/

  // permiso del usuario logueado
  tipoPermisoUsuario: string;

  // jefe de servicio -> idServicio variable

  // recursos
  servicios: Servicio[];

  /** FIN **/

  opciones = ['Cedula', 'Nombre','Tipo de Elegible'];
  // Opcion por default.
  opcionSeleccionada: any = 'Cedula';

  // variables
  puestos: Puesto[];
  primerPuesto: number;
  formBuscarElegibles: FormGroup;
  elegibles: Elegible[];
  urlViewError: string;
  urlViewPermissionError: string;
  // datos obtener lista elegibles;

  idPuesto: string;
  fechaInicial: string;
  fechaFinal: string;
  idServicio: number;

  // lista Funcionarios para nombramiento
  listaNombresFuncionarios: Array<string>;

  // modal
  modalOption: NgbModalOptions = {} // not null

  constructor(private puestosService: PuestosService,
    private elegiblesService: ElegiblesService, private toasterManagerService: ToasterManagerService,
    private formBuilder: FormBuilder, private _router: Router,
    private modalService: NgbModal, private authService: AuthService, private global: GlobalesService) {

    this.elegibles = new Array<Elegible>();
    this.urlViewError = '/ser/elegibles/error-handle';
    this.urlViewPermissionError = '/ser/elegibles/permission-error-handle'
    this.listaNombresFuncionarios = new Array<string>();
  }


  ngOnInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;

    this.formBuscarElegibles = this.formBuilder.group({
      'servicio_input': ['', [Validators.required]],
      'puesto_input': ['', [Validators.required]],
      'fechaInicio_input': ['', [Validators.required]],
      'fechaFinal_input': ['', [Validators.required]],
    });

    this.verificarPermisosUsuario();
    this.obtenerNombreFuncionarios();
  }
  /*
  Descripcion: Se encarga de verificar los permisos del usuario
  Obtiene la informacion del usuario logueado y obtiene los permisos
  Dependiendo de los permisos, se mostrara informacion diferente en
  el html (servicios)
  */
  verificarPermisosUsuario() {
    this.tipoPermisoUsuario = this.authService.getRoles().ser.split(',');
    let Roles = this.global.variablesGlobales.roles;
    // jefe de servicio.
    if (this.tipoPermisoUsuario.includes(Roles.JEFE_SERVICIO)) {
      this.obtenerServicioFuncionario();
    }
    else if(this.tipoPermisoUsuario.includes(Roles.RECURSOS_HUMANOS)) {
      this.obtenerServicios();
    }
    else {
      this._router.navigate([this.urlViewPermissionError]);
    }

  }
  /*
  Descripcion: Se encarga de obtener los servicios de la base de datos
  Envia: No aplica
  Recibe: Recibe una lista de servicios
  */
  obtenerServicios() {
    this.elegiblesService.obtenerServicios()
      .subscribe(
        success => {
          this.servicios = success;
          if (this.servicios.length > 0) {
            this.idServicio = this.servicios[0].id;
            this.obtenerPuestos();
          }
        },
        err => {
          this._router.navigate([this.urlViewError]);
        },
      );
  }
  /*
  Descripcion: Se encarga de obtener el servicio en el que se encuentra
  laborando actualmente el funcionario, mediante una analisis
  de su nombramiento. No se brindaran permisos de acceso si el
  usuario no tiene un nombramiento actual
  Envia: no aplica
  Recibe: El id del servicio en el que esta
  laborando el funcionario
  */
  obtenerServicioFuncionario() {
    this.elegiblesService.obtenerServicioFuncionario()
      .subscribe(
        success => {
          this.idServicio = success['id_servicio'];
          if (this.idServicio !== undefined) 
            this.obtenerPuestos();
          else {
            this._router.navigate([this.urlViewPermissionError])};
            console.log(success);
        },
        err => {
          this._router.navigate([this.urlViewPermissionError]);
          console.error(err);
        },
      );
  }

  /*
  Descripcion: Se encarga de obtener una lista con los nombres de los funcionarios,
  ordenada alfabeticamente
  Recibe: lista de string (con los nombres completos de los funcionarios)
  Envia: no aplica
  */
  obtenerNombreFuncionarios() {
    this.elegiblesService.obtenerListaNombresFuncionarios()
      .subscribe(
        success => {
          this.listaNombresFuncionarios = success;
        },
        err => {
          this.toasterManagerService.makeToast('warning', '¡Atención!',
            'Algunos datos no se cargaron correctamente');
        },
      );
  }
  /*
  Descripcion: Se encarga de obtener todos los puestos de un servicio
  en especifico
  Envia: El id del servicio que se quiere analizar
  Recibe: una lista de puestos
  */
  obtenerPuestos() {
    this.puestosService.puestosSegunIdServicio(this.idServicio)
      .subscribe(
        success => {
          this.puestos = success;
          if (this.puestos.length > 0) {
            this.primerPuesto = this.puestos[0].id;
          }
        },
        err => {
          this._router.navigate([this.urlViewError]);
        },
      );
  }

  /*
  Obtiene los datos del formulario y verifica los mismos.
  No se mostrara ni se procesara ninguna informacion si los
  datos no son aceptables
  */
  onSubmit(form: any) {
    this.idPuesto = form.puesto_input;
    this.fechaInicial = form.fechaInicio_input;
    this.fechaFinal = form.fechaFinal_input;
    this.verificarDatos();
  }

  // verifica que no hayan datos vacios
  verificarDatos() {
    if (this.fechaInicial !== '' && this.fechaFinal !== '' && this.idPuesto !== '') this.verificarFecha();
    else this.toasterManagerService.makeToast('error', 'Elegibles', 'Faltan datos');
  }

  // verifica que la fecha final no sea inferior a la fecha inicial
  verificarFecha() {
    if (new Date(this.fechaFinal).getTime() > new Date(this.fechaInicial).getTime()) this.obtenerListaElegibles();
    else this.toasterManagerService.makeToast('error', 'Elegibles', 'La fecha final debe ser superior a la fecha inicial');
  }

  /*
  Descripcion: Se encarga de obtener la lista de elegibles,
  segun los datos obtenidos en el formulario
  Recibe: una lista de elegibles, segun la informacion establecida en el modelo
  elegible
  Envia:
      -idPuesto: id del puesto que se quiere analizar sus elegibles
      -fecha inicial: Fecha de inicio del nombramiento que se
      quiere hacer para cubrir un puesto
      -fecha inicial: Fecha final del nombramiento que se
      quiere hacer para cubrir un puesto
  */
  obtenerListaElegibles() {
    this.elegiblesService.obtenerListaElegibles(this.idPuesto, this.fechaInicial, this.fechaFinal)
      .subscribe(
        success => {
          this.elegibles = success;
          if (this.elegibles.length <= 0) {
            this.toasterManagerService.makeToast('info', 'Elegibles', 'No existen funcionarios asociados al puesto');
          }
        },
        err => {
          this.toasterManagerService.makeToast('error', 'Elegibles', 'No se pudieron cargar los datos');
        },
      );
  }

  // se encarga de abrir el modal de crear nombramiento
  nombrarElegibleOnClick(elegible: Elegible) {
    const modalRef = this.modalService.open(NombrarElegiblesComponent, this.modalOption);
    modalRef.componentInstance.elegible = elegible;
    modalRef.componentInstance.fechaInicio = this.fechaInicial;
    modalRef.componentInstance.fechaFinal = this.fechaFinal;
    modalRef.componentInstance.idPuesto = this.idPuesto;
    modalRef.componentInstance.listaNombresFuncionarios = this.listaNombresFuncionarios;
    modalRef.componentInstance.estadoFuncionario = elegible.disponible;
    modalRef.result.then((result) => {
      this.obtenerListaElegibles();
    });
  }
}
