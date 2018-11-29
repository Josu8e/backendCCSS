import { Puesto } from './../../../ser/models/Puesto';
import { Component, OnInit } from '@angular/core';
import { HorasExtra, Funcionarios } from '../conteo'
import { ConteoService } from '../conteo.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AgregarModalComponent } from '../agregar-modal/agregar-modal.component';
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';
import { ModalConfirmacionService } from '../../../componentes-globales/modal-confirmacion/modal-confirmacion.service';

@Component({
  selector: 'ngx-realizar',
  templateUrl: './realizar.component.html',
  styleUrls: ['./realizar.component.scss']
})

export class RealizarComponent implements OnInit {

  config = configToasterManager;
  registrosConteo: Array<Funcionarios>;
  modalOption: NgbModalOptions = {};
  nombreServicio: string;
  listaFuncionarios: Array<Funcionarios>;
  listaPuestos: Array<any>;

  constructor(private modalConfirmacionService: ModalConfirmacionService, private modalService: NgbModal, private conteoService: ConteoService, private toasterManagerService: ToasterManagerService) { }

  // Obtiene los datos del servicio actual
  obtenerServicio(): void {
    this.conteoService.obtenerNombreServicio()
      .subscribe(res => {
        this.nombreServicio = res['nombre_servicio'];
        // Se consultan los registros de conteos anteriores
        this.conteoService.obtenerRegistrosConteo(res['id_servicio'])
          .subscribe(this.observerListaConteo);
        // Se consultan los puestos del servicio  
        this.conteoService.obtenerPuestos(res['id_servicio'])
          .subscribe(this.observerListaPuestos);
      },
        error => {
          this.toasterManagerService.makeToast('error', 'No se puede obtener el servicio! ',
            'No se puede obtener el servico al que pertenece su cuenta debido  un error con el servidor.')
        },
      );
  }

  observerFuncionarios = {
    // primero se obtienen los datos de los registros de conteo
    next: funcionaros => { this.listaFuncionarios = funcionaros },
    // en caso de error
    error: err => error => {
      this.toasterManagerService.makeToast('error', 'No se puede obtener funcionarios! ',
        'No se puede obtener funcionarios debido a un error con el servidor.');
    },
    /* cuando se obtengan los funcionarios para el select, si es modificar, se selecciona el funcionario,
     al que pertenece el usuario en el select*/
    complete: () => {
      this.limpiarListaFuncionarios()
    }
  }

  observerListaConteo = {
    // primero se obtienen los datos de los registros de conteo
    next: resgistros => { this.registrosConteo = resgistros },
    // en caso de error
    error: err => error => {
      this.toasterManagerService.makeToast('error', 'No se puede obtener registro conteo! ',
        'No se puede obtener registro conteo debido a un error con el servidor.');
    },
    /* cuando se obtengan los funcionarios para el select, si es modificar, se selecciona el funcionario,
     al que pertenece el usuario en el select*/
    complete: () => {
      this.conteoService.consultarFuncionarios()
        .subscribe(this.observerFuncionarios);
      if (this.registrosConteo.length === 0) {
        this.toasterManagerService.makeToast('info', 'No hay registros! ',
          'No hay horas extra asignadas a  funcionarios.');
      }
    }
  }

  observerListaPuestos = {
    next: puestos => { this.listaPuestos = puestos },
    error: err => error => {
      this.toasterManagerService.makeToast('error', 'No se puede obtener los puestos! ',
        'No se puede obtener no se pueden obtener los puestos debido a un error con el servidor.');
      console.log(error);
    }
  }

  limpiarListaFuncionarios() {
    this.registrosConteo.forEach(registro => {
      this.listaFuncionarios.forEach((item, index) => {
        if (item.cedula === registro.cedula) {
          this.listaFuncionarios.splice(index, 1)
        }
      })
    });
  }

  ngOnInit() {
    this.obtenerServicio();
  }

  abrirModal(funcinario: Funcionarios) {
    if (this.listaFuncionarios.length === 0 && funcinario === null) {
      this.toasterManagerService.makeToast('warning', 'No hay Funcionarios!',
        'Todos los funcionarios del servicio ' + this.nombreServicio +
        ' fueron agregados.')
    }
    else {
      this.modalOption.backdrop = 'static';
      this.modalOption.keyboard = false;
      const modalRef = this.modalService.open(AgregarModalComponent, this.modalOption);
      modalRef.componentInstance.registrosConteo = this.registrosConteo;
      modalRef.componentInstance.funcionario = funcinario;
      modalRef.componentInstance.Funcionarios = this.listaFuncionarios;
      modalRef.componentInstance.Puestos = this.listaPuestos;

    }
  }
  eliminarHoras(funcinario: Funcionarios) {
    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Desea borrar el registro ' + funcinario.nombre + '?')
      .then((confirmed) => {
        if (confirmed) {
          const posicion = this.registrosConteo.findIndex(
            (fun: Funcionarios) => {
              return fun.id_funcionario_nombramiento === funcinario.id_funcionario_nombramiento;
            },
          );
          this.conteoService.eliminarRegistro(funcinario).subscribe(
            () => {
              this.registrosConteo.splice(posicion, 1),
                this.listaFuncionarios.push(funcinario),
                this.toasterManagerService.makeToast('success', 'Se ha borrado exitosamente!',
                  'Se ha eliminado el registro ' + funcinario.nombre +
                  ' correctamente.')
            },
            error => {
              this.toasterManagerService.makeToast('error', 'No se completo el eliminar! ',
                'No se ha eliminado el funcionario ' + funcinario.nombre +
                ' debido a un error con el servidor.')
            },
          );

        }
      })

  }
}
