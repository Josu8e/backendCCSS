import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { InsertarComponent } from '../insertar/insertar.component';
import { UsuariosService } from '../usuarios.service'
import { Usuario } from '../usuario';
import { FiltroPipe } from '../filtro.pipe';
import { ModalConfirmacionService } from '../../../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'ngx-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss'],
})


export class ConsultarComponent implements OnInit {
  constructor(private modalConfirmacionService: ModalConfirmacionService, private modalService: NgbModal,
    private usuariosService: UsuariosService, private toasterManagerService: ToasterManagerService) {

  }
  modalOption: NgbModalOptions = {};
  private datosUsuarios: Usuario[];
  response: any;
  opciones = ['Cedula', 'Nombre', 'Usuario'];
  opcionSeleccionada: any = 'Cedula';
  buscar: string;
  config = configToasterManager;
  getUsuarios(): void {
    this.usuariosService.consultarUsuarios()
      .subscribe(res => { this.datosUsuarios = res },
        error => {
          this.toasterManagerService.makeToast('error', 'No se puede obtener usuarios! ',
            'No se puede obtener usuarios debido a un error con el servidor.')
        },
    );
  }
  ngOnInit() {
    this.getUsuarios();
  }

  abrirModal(usuario: Usuario) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    const modalRef = this.modalService.open(InsertarComponent, this.modalOption);
    modalRef.componentInstance.listaUsuarios = this.datosUsuarios;
    modalRef.componentInstance.usuario = usuario;
  }
  eliminarUsuario(usuario: Usuario) {
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Desea borrar el usuario ' + usuario.nombre_usuario + '?')
      .then((confirmed) => {
        if (confirmed) {
          const posicion = this.datosUsuarios.findIndex(
            (us: Usuario) => {
              return us.id === usuario.id;
            },
          );
          this.usuariosService.eliminarUsuario(usuario.id).subscribe(
            () => {
              this.datosUsuarios.splice(posicion, 1),
                this.toasterManagerService.makeToast('success', 'Se ha borrado exitosamente!',
                  'Se ha eliminado el usuario ' + usuario.nombre_usuario +
                  ' correctamente.')
            },
            error => {
              this.toasterManagerService.makeToast('error', 'No se completo el eliminar! ',
                'No se ha eliminado el usuario ' + usuario.nombre_usuario +
                ' debido a un error con el servidor.')
            },
          );

        }
      })
  }
}
