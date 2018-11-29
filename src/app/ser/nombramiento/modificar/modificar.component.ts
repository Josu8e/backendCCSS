import { Component, OnInit, Input  } from '@angular/core';
import {Nombramiento} from '../../models/Nombramiento';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NombramientosService} from '../nombramientos.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Puesto} from '../../models/Puesto';
import {ToasterManagerService} from '../../../@core/toast/toaster-manager.service';
import 'style-loader!angular2-toaster/toaster.css';
import {configToasterManager} from '../../../@core/toast/config';
import {Funcionario} from '../../../auth/funcionario';

@Component({
  selector: 'ngx-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss'],
})
export class ModificarComponent implements OnInit {
  @Input() nom: Nombramiento; // Aqui se guarda la informacion del nombramiento que se quiere modificar, para mostrarlo en el modal
  myItems: Nombramiento[] = new Array();
  public nombramientoEdit: Nombramiento;
  editForm: FormGroup;
  // Listas para rellenar los select que se usan en los select del modal de modificar nombramiento
  listaTipos = ['Interino', 'Propiedad'];
  listaTiempo = ['Medio', 'Completo'];
  motivo= ['Vacaciones', 'Dia libre', 'Incapacidad', 'PSGS', 'PCGS']
  // Listas que se rellenan con las funciones que traen de la BD
  public puestos: Puesto[];
  public listaFuncionarios: Funcionario[];
  @Input() puesto: Puesto;
  public listaNom: Nombramiento[];

  config= configToasterManager;


  constructor(formBuilder: FormBuilder, public nomService: NombramientosService, private activeModal: NgbActiveModal,
              public toasterManagerService: ToasterManagerService) {
    this.editForm = formBuilder.group({
      'idPuesto': [''],
      'cedula': [''],
      'fecha_inicio': [''],
      'fecha_fin': [''],
      'tiempo': [''],
      'tipo': [''],
      'sustituye': [''],
      'motivo': [''],
    });
  }


  /*
  Descripcion: Maneja los datos suministrados en el formulario para modificar nombramiento
  Recibe: Recibe todos los parametros requeridos que se pueden modificar de un nombramiento
  Envia: Llama a la función que hace conexión con el backend para editar el registro
  */
  onSubmit(form: any) {

    const id = this.nom.id;
    let dateInicio;
    let dateFin;
    const idPuesto = form.idPuesto;
    const cedula = form.cedula;
    let fecha_inicio ;
    let fecha_fin ;
    if (form.fecha_inicio.year === undefined) {
      fecha_inicio = this.nom.fecha_inicio;
    } else {
      dateInicio = form.fecha_inicio.year + '-' + form.fecha_inicio.month + '-' + form.fecha_inicio.day;
      fecha_inicio = dateInicio
    }
    // j
    if (form.fecha_fin.year === undefined) {
      fecha_fin = this.nom.fecha_fin;
    } else {
      dateFin = form.fecha_fin.year + '-' + form.fecha_fin.month + '-' + form.fecha_fin.day;
      fecha_fin = dateFin
    }
    const tiempo = form.tiempo;
    const tipo = form.tipo;
    const sustituye = form.sustituye;
    const motivo = form.motivo;
    const estado = this.nom.estado;
    const numero_dias = this.nom.numero_dias;
    window.console.log(id)
    window.console.log(idPuesto)
    window.console.log(cedula)
    window.console.log(fecha_inicio)
    window.console.log(fecha_fin)
    window.console.log(tiempo)
    window.console.log(tipo)
    window.console.log(sustituye)
    window.console.log(motivo)
    const nombramientoEdit = new Nombramiento(id, idPuesto, cedula, fecha_inicio, fecha_fin, numero_dias, tiempo, tipo,
      sustituye, motivo, estado);
    this.nombramientoEditar(nombramientoEdit);
  }

  /*
  Descripcion: Funcion que hace conexión con el service para el envio de la información al backend (por ende a la BD)
  Recibe: Recibe los datos que vienen del OnSubmit, que son los digitados por el cliente para la modificación.
  Envia: Envia directamente al backend los datos por modificar.
  */
  nombramientoEditar(nombramiento: Nombramiento) {
    this.nomService.updateNombramiento(nombramiento)
      .subscribe(success => {
          this.nombramientoEdit = success;
          window.console.log('resultado' + this.nombramientoEdit )
          this.activeModal.close();
          this.toasterManagerService.makeToast('success', 'Éxito', 'El nombramiento se modificó con éxito');
          // window.location.reload();
        },
        err => {
        window.console.log('error en editar')
          this.toasterManagerService.makeToast('warning', '¡Error!', 'Hubo un error a la hora de modificar el nombramiento.');
        },
      );
  }

  ngOnInit() {
    this.puestosCargarLista();
    this.puestosCargar();
    this.cargarListaFuncionarios();
  }

  /*
  Descripcion: Funcion para cerrar el modal de modificar nombramientos.
  Recibe: N/A
  Envia: N/A
  */
  cancelar() {
    this.activeModal.close();
  }

  /*
  Descripcion: Funcion que obtiene la lista de puestos para poder completar el select de puestos en el modal de modificar
  nombramientoss
  Recibe: N/A
  Envia: Un json con los diferentes puestos en la BD para poder mostrarlos en el select
  */
  puestosCargar() {
    this.nomService.puestosObtenerLista()
      .subscribe(
        success => {
          this.puestos = success;
        },
        err => {
          // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
      );
  }

  /*
    Descripcion: Funcion que obtiene la lista de nombramientos guardados en la base de datos.
    Recibe:
    Envia: Lista con todos los noombramientos hasta el momento.
    */
  puestosCargarLista(): void {
    this.nomService.getNom()
      .subscribe(
        success => {
          this.listaNom = success;
        },
        err => {
          window.console.log('error')  // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
      );
  }

  /*
  Descripcion: Funcion que obtiene  la información de todos los funcionarios inscritos en la base de datos, los cuales
  se van a utilizar en el select de Sustituye y cedula del funcionario en el modal de modificar nombramiento.
  Recibe: N/A
  Envia: Una lista con los datos de los funcionarios.
  */
  cargarListaFuncionarios(): void {
    this.nomService.getCedulaFuncionario()
      .subscribe(
        success => {
          this.listaFuncionarios = success;
        },
        err => {
          window.console.log('error')  // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
      );
  }


}
