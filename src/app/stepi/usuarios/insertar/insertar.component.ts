import { AccesoStepiA } from './../usuario';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Usuario, Funcionario, Acceso } from '../usuario';
import { UsuariosService } from '../usuarios.service';
import { ModalConfirmacionService } from '../../../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.scss'],
})
export class InsertarComponent implements OnInit {
  constructor(private modalConfirmacionService: ModalConfirmacionService, public activeModal: NgbActiveModal,
    private usuariosService: UsuariosService, private toasterManagerService: ToasterManagerService) { }
  // variables que vienen desde el componente de consultar.
  @Input() listaUsuarios;
  @Input() usuario: Usuario;
  config = configToasterManager;
  // opciones para el select de funcionarios
  placeholder: string = 'Buscar funcionario...';
  notFoundText: string = 'Funcionario no encontrado.';
  clearAllText: string = 'Limpiar';
  placeholderMultiSelect = 'Seleccionar los accesos de STEPI';
  funcionario: Funcionario;
  deshabilitado: boolean;
  // checkboxes y selects
  checkboxStepi: boolean;
  checkboxSer: boolean;
  placeholderSelectStepi = 'Seleccionar acceso STEPI';
  placeholderSelectSer = 'Seleccionar acceso SER';
  
  // solicitud actual
  solicitudActual;
  private Funcionarios: Funcionario[];


  // opciones de acceso
 

  opcionesSer: Acceso[] = [new Acceso('Usuarios', 1), new Acceso('Administrador de sistema', 2), new Acceso('Recursos humanos', 6)];
  
  accesoStepi: AccesoStepiA;
  accesoSer: Acceso;
/*
multi check//////////////////////////////////////////////////////////////////////////////////////////
*/
dropdownList = [];
selectedItems = [];
dropdownSettings = {};


opcionesStepi: AccesoStepiA[] = 
                [new AccesoStepiA('Usuarios','1'), 
                new AccesoStepiA('Administrador de sistema', '2'), 
                new AccesoStepiA('Presupuesto', '3'),
                new AccesoStepiA('Administrativo', '4'),
                new AccesoStepiA('Supervisor', '5')];


/////////////////////////////////////////////////////////////////////////////////////////////////////
  /* observer de funcionarios, para que cuando se obtengan los funcionarios, si es modificar,
  se busca el funcionario al que corresponde el usuario a modificar*/
  observerFuncionarios = {
    // primero se obtienen los datos de funcionarios
    next: datosFuncionarios => { this.Funcionarios = datosFuncionarios },
    // en caso de error
    error: err => error => {
      this.toasterManagerService.makeToast('error', 'No se puede obtener funcionarios! ',
        'No se puede obtener funcionarios debido a un error con el servidor.');
    },
    /* cuando se obtengan los funcionarios para el select, si es modificar, se selecciona el funcionario,
     al que pertenece el usuario en el select*/
    complete: () => {
      if (this.usuario !== null) {
        this.Funcionarios.forEach(fun => {
          if (fun.cedula === this.usuario.cedula) {
            this.funcionario = fun;
          }
        });
      }
    },
  };

  // titulo de la ventana, si es modificar o insertar
  private titulo;


  // Al abrir el modal
  ngOnInit() {
    
    this.solicitudActual = new Usuario();
    // se carga la lista de funcionarios para el modal
    this.usuariosService.consultarFuncionarios()
      .subscribe(this.observerFuncionarios);
    // si el usuario que viene desde consultar es null, es insertar en caso contrario es modificar.
    if (this.usuario == null) {
      this.titulo = 'Insertar';
      this.checkboxStepi = false;
      this.checkboxSer = false;
    } else {
      this.titulo = 'Modificar';
      // deshabilitar el select
      this.deshabilitado = true;
      // se copia el usuario que viene desde consultar a la solicitud actual
      this.solicitudActual = Object.assign({}, this.solicitudActual, this.usuario); 
      if (this.solicitudActual.STEPI === '0' || this.solicitudActual.STEPI === null) {
        this.checkboxStepi = false;
        this.solicitudActual.STEPI = null;
      } else {
        this.checkboxStepi = true;
      }
      if (this.solicitudActual.SER === '0' || this.solicitudActual.SER === null) {
        this.checkboxSer = false;
        this.solicitudActual.SER = null;
      } else {
        this.checkboxSer = true;
      }
      
      this.opcionesStepi.forEach(stepi => {
        if (stepi.acceso.toString() === this.solicitudActual.STEPI) {
          this.accesoStepi = stepi;
        }
      });
      
      this.opcionesSer.forEach(ser => {
        if (ser.acceso.toString() === this.solicitudActual.SER) {

          this.accesoSer = ser;
        }
      });
    }
    //multicheck
    this.dropdownList = [
      { item_id: 1, item_text: 'Usuarios' },
      { item_id: 2, item_text: 'Administrador de sistema' },
      { item_id: 3, item_text: 'Presupuesto' },
      { item_id: 4, item_text: 'Administrativo' },
      { item_id: 5, item_text: 'Supervisor' }
    ];
    this.selectedItems = [
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Desseleccionar todos',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  // funcion de busqueda de los funcionarios en el select
  busquedaFuncionarios(texto: string, item: Funcionario) {
    texto = texto.toLocaleLowerCase();
    return item.nombre.toLocaleLowerCase().includes(texto) || item.cedula.toString().toLocaleLowerCase().includes(texto);
  }
  limpiarSelectStepi(checkbox: boolean) {
    if (!checkbox) {
      this.accesoStepi = null;
    }
  }
  limpiarSelectSer(checkbox: boolean) {
    if (!checkbox) {
      this.accesoSer = null;
    }
  }
  cerrar() {
    this.activeModal.close()
  }
  // para guardar los cambios
  guardarDatos() {
    // cuando es insertar
    console.log("patito");
    console.log(this.usuario);
    if (this.usuario == null) {
      // se asigna la cedula del funcionario a la cedula del usuario
      this.solicitudActual.cedula = this.funcionario.cedula;
      console.log(this.accesoStepi);
      if (this.checkboxStepi) {
        var numeroAccesos = this.selectedItems[0].item_id;
        console.log(this.selectedItems);
        for (let i = 1; i< this.selectedItems.length; i++) {
              numeroAccesos = numeroAccesos + ","+this.selectedItems[i].item_id;
              console.log(this.selectedItems[i].item_id);
        }
        
        var accesosStepi = new AccesoStepiA('Accesos',numeroAccesos);
        this.solicitudActual.STEPI = numeroAccesos;
      } else {
        this.solicitudActual.STEPI = null;
      }
      if (this.accesoSer !== null && this.accesoSer !== undefined) {
        this.solicitudActual.SER = this.accesoSer.acceso;
      } else {
        this.solicitudActual.SER = null;
      }
      // se envia post al backend para insertar usuarios.
      this.usuariosService.insertarUsuario(this.solicitudActual).subscribe(
        /* se recibe el usuario que se inserto a la base de datos, y se agrega a la lista para poder
        visuarlizar cambios*/
        usuario => {
          this.listaUsuarios.push(usuario[0]);
          this.toasterManagerService.makeToast('success', 'Se ha insertado exitosamente!',
            'Se ha insertado el usuario ' + this.solicitudActual.nombre_usuario +
            ' correctamente.');
        },
        error => {
          this.toasterManagerService.makeToast('error', 'No se completo el agregar! ',
            'No se ha agregado el usuario ' + this.solicitudActual.nombre_usuario +
            ' debido a un error con el servidor.');
        },
      );
      this.activeModal.close()
    } else {
      if (this.checkboxStepi) {
        var numeroAccesos = this.selectedItems[0].item_id;
        console.log(this.selectedItems);
        for (let i = 1; i< this.selectedItems.length; i++) {
              numeroAccesos = numeroAccesos + ","+this.selectedItems[i].item_id;
              console.log(this.selectedItems[i].item_id);
        }
        
        var accesosStepi = new AccesoStepiA('Accesos',numeroAccesos);
        this.solicitudActual.STEPI = numeroAccesos;
      } else {
        this.solicitudActual.STEPI = null;
      }
      if (this.accesoSer !== null && this.accesoSer !== undefined) {
        this.solicitudActual.SER = this.accesoSer.acceso;
      } else {
        this.solicitudActual.SER = null;
      }


      this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Quiere modificar el usuario ' + this.usuario.nombre_usuario + '?')
        .then((confirmed) => {
          if (confirmed) {
            // se envia put al backend para modificar usuarios.
            this.usuariosService.modificarUsuario(this.solicitudActual).subscribe(
              /* se recibe el usuario que se modifico en la base de datos, y se modifica en la lista para poder
              visuarlizar cambios*/
              usuario => {
                this.usuario.nombre_usuario = usuario[0].nombre_usuario;
                this.usuario.STEPI = usuario[0].STEPI;
                this.usuario.SER = usuario[0].SER;
                this.toasterManagerService.makeToast('success', 'Se ha modificado exitosamente!',
                  'Se ha modificado el usuario ' + this.solicitudActual.nombre_usuario +
                  ' correctamente.');
              },
              error => {
                this.toasterManagerService.makeToast('error', 'No se completo el modificar! ',
                  'No se ha modificado el usuario ' + this.solicitudActual.nombre_usuario +
                  ' debido a un error con el servidor.');
              },
            );
            // se cierra la ventana del modal
            this.activeModal.close()
          }
        })
    }
  }

  //multi select
  onItemSelect (item:any) { 
    console.log(item);
  }
  onSelectAll (items: any) {
    console.log(items);
  }

  onItemDeSelect (items: any) {
    console.log(items);
  }
}
