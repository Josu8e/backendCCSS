import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { InsertarComponent } from '../insertar/insertar.component';

import { FuncionariosService } from '../funcionarios.service';
import { Funcionario } from '../funcionario';

import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';

import { ModalConfirmacionService } from '../../../componentes-globales/modal-confirmacion/modal-confirmacion.service';

@Component({
  selector: 'ngx-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements OnInit {

  config = configToasterManager;
  modalOption: NgbModalOptions = {}; // not null!
  //Opciones de busqueda.
  opciones = ['Cedula', 'Nombre', 'Apellido 1', 'Apellido 2', 'Fecha Nacimiento', 'Fecha Ingreso', 'Numero Tarjeta',
    'Correo', 'Nombre Completo'];
  //Opcion por default.
  opcionSeleccionada: any = 'Cedula';
  private datosFuncionario: Funcionario[];

  constructor(private modalConfirmacionService: ModalConfirmacionService,
    private modalService: NgbModal,
    private funcionarioService: FuncionariosService,
    private toasterManagerService: ToasterManagerService) {

  }

  //Obtiene la lista de los funcionarios existentes.
  getFuncionarios(): void {
    this.funcionarioService.consultarFuncionarios()
      .subscribe(res => this.datosFuncionario = res);
  }

  ngOnInit() {
    this.getFuncionarios();
  }

  //Abrir modal, para insertar o para modificar.
  abrirModal(Funcionario: Funcionario, modificar: boolean) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';
    const modalRef = this.modalService.open(InsertarComponent, this.modalOption);
    modalRef.componentInstance.datosFuncionario = this.datosFuncionario;
    modalRef.componentInstance.funcionario = Funcionario;
    modalRef.componentInstance.modificar = modificar;
  }

  // Al dar clic al boton de eliminar.
  borrarFuncionario(funcionario: Funcionario) {
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Desea borrar el funcionario ' + funcionario.nombre + '?')
      .then((confirmed) => {
        if (confirmed) {
          const posicion = this.datosFuncionario.findIndex(
            (func: Funcionario) => {
              return func.cedula === funcionario.cedula;
            },
          );
          this.funcionarioService.borrarFuncionario(funcionario.cedula).subscribe(
            () => {
              this.datosFuncionario.splice(posicion, 1),
                this.toasterManagerService.makeToast('success', 'Eliminar',
                  'Funcionario eliminado')
            },
            error => {
              this.toasterManagerService.makeToast('error', '¡No se completo el eliminar!',
                'No se ha eliminado el funcionario debido a un error con el servidor.')
            },
          );
        }
      })
  }
}
