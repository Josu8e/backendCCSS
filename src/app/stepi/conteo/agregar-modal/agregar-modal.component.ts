import { filter } from 'rxjs/operators';
import { Funcionario } from './../../../auth/funcionario';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Funcionarios, Solicitud } from '../conteo';
import { ConteoService } from '../conteo.service';
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'agregar-modal',
  templateUrl: './agregar-modal.component.html',
  styleUrls: ['./agregar-modal.component.scss']
})

export class AgregarModalComponent implements OnInit {
  // Solicitud Actual
  @Input() funcionario;
  @Input() registrosConteo;
  @Input() Funcionarios;
  @Input() Puestos;
  modalOption: NgbModalOptions = {};
  solicitudActual;
  puestoActual;
  funcionarioActual;
  sustituto;
  listaSustitutos = { ...this.Funcionarios };
  deshabilitado = false;
  titulo: string;
  // opciones para el select de funcionarios
  placeholder: string = 'Buscar funcionario...';
  notFoundText: string = 'Funcionario no encontrado.';
  clearAllText: string = 'Limpiar';
  motivo;
  // opciones para el select de los motivos de ausencia
  motivos = ['Incapacidad', 'Permiso con goce salarial', 'Permiso sin goce salarial', 'Producción', 'Otro']
  justificacion;

  constructor(public activeModal: NgbActiveModal, private toasterManagerService: ToasterManagerService, private conteoService: ConteoService) { }
  ngOnInit() {
    // this.solicitudActual = new solicitudActual()
    this.solicitudActual = new Solicitud();

    if (this.funcionario == null) {
      this.titulo = 'Insertar';
    }

    else {
      this.titulo = 'Modificar';
      this.funcionarioActual = Object.assign({}, this.funcionarioActual, this.funcionario);
      this.deshabilitado = true;
      this.solicitudActual.horas = this.funcionario.horas;
    }

  }

  cerrar() {
    this.activeModal.close();
  }

  obtenerFecha() {
    let hoy = new Date();
    let dia = hoy.getDate();
    let mes = hoy.getMonth() + 1;
    let annio = hoy.getFullYear();

    return `${dia}/${mes}/${annio}`;
  }


  guardarDatos() {
    if (this.funcionario == null) {
      // this.solicitudActual.id_funcionario_nombramiento = this.funcionarioActual.id_funcionario_nombramiento;
      // this.solicitudActual.id_persona_ausente = this.funcionarioActual.id_funcionario_nombramiento;

      // this.solicitudActual.id_Puesto = this.funcionarioActual.id_puesto;

      this.solicitudActual.id_persona_ausente = this.funcionarioActual.cedula;
      this.solicitudActual.id_Puesto = this.puestoActual.id;
      this.solicitudActual.fecha = this.obtenerFecha();

      if (this.sustituto) {
        this.solicitudActual.Id_sustituto = this.sustituto.cedula;
      }

      const posicion = this.Funcionarios.findIndex(
        (fun: Funcionarios) => {
          return fun.id_funcionario_nombramiento === this.funcionarioActual.id_funcionario_nombramiento;
        },
      );

      this.conteoService.insertarRegistro(this.solicitudActual).subscribe(
        /* se recibe el usuario que se inserto a la base de datos, y se agrega a la lista para poder
        visuarlizar cambios*/
        res => {
          console.log(res);
          this.registrosConteo.push(res);
          this.Funcionarios.splice(posicion, 1);
        }
      );
      this.activeModal.close()
    } else {
      this.solicitudActual.id_funcionario_nombramiento = this.funcionarioActual.id_funcionario_nombramiento;
      this.solicitudActual.id_puesto = this.funcionarioActual.id_puesto;
      this.conteoService.modificarRegistro(this.solicitudActual).subscribe(
        /* se recibe el usuario que se inserto a la base de datos, y se agrega a la lista para poder
        visuarlizar cambios*/
        res => {
          this.funcionario.horas = res['horas'];
        }
      );
      this.activeModal.close()
    }
  }

  // funcion de busqueda de los funcionarios en el select
  busquedaFuncionarios(texto: string, item: Funcionarios) {
    texto = texto.toLocaleLowerCase();
    return item.nombre.toLocaleLowerCase().includes(texto) || item.cedula.toString().toLocaleLowerCase().includes(texto);
  }

  // funcion de busqueda de los puestos en el select
  busquedaPuestos(texto: string, item: any) {
    texto = texto.toLocaleLowerCase();
    return item.nombre.toLocaleLowerCase().includes(texto) || item.id.toString().toLocaleLowerCase().includes(texto);

  }

  // Filtra la lista de sustitutos para no incluir el funcionario actual
  filtrarSustituto(funcionarioActual: Funcionario) {
    this.listaSustitutos = { ...this.Funcionarios };
    this.listaSustitutos = this.Funcionarios.filter(x => x.cedula !== funcionarioActual.cedula);
    if (this.sustituto)
      this.sustituto = (this.sustituto.cedula === funcionarioActual.cedula) ? undefined : this.sustituto;
  }
}
