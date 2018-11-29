import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DetalleIncapacidadComponent } from './detalle-incapacidad/detalle-incapacidad.component';
import { async } from '@angular/core/testing';
import { ReportesService } from './../reportes.service';
import { Component, OnInit } from '@angular/core';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ausencias-persona',
  templateUrl: './ausencias-persona.component.html',
  styleUrls: ['./ausencias-persona.component.scss']
})

export class AusenciasPersonaComponent implements OnInit {

  funcionarios: any[];
  ausenciasFuncionarios: any[] = [];
  modalOptions: NgbModalOptions = {};
  opciones = ['Cedula', 'Nombre', 'Primer apellido', 'Segundo apellido', 'Fecha', 'Puesto', 'Motivo'];
  consultar;
  opcionSeleccionada: any = 'Cedula';

  constructor(private reportesService: ReportesService, private modalService: NgbModal) {

  }

  funcionariosObserver = {
    next: registro => { this.funcionarios = registro },
    complete: async () => {
      for (let i in this.funcionarios) {
        let ausenciaInfo = await this.reportesService.obtenerAusenciasFuncionario(this.funcionarios[i].cedula);
        for (let j in ausenciaInfo) {
          this.ausenciasFuncionarios.push(ausenciaInfo[j]);
        }
      }
      console.log(this.ausenciasFuncionarios);
    }
  }

  cargarFuncionarios() {
    this.reportesService.obtenerFuncionarios()
      .subscribe(this.funcionariosObserver);
  }

  mostrarDetalleIncapacidad(doctor, idBoleta) {
    alert(`Nombre del doctor: ${doctor} \n Id de la boleta: ${idBoleta}`)
  }

  ngOnInit() {
    this.cargarFuncionarios();
  }

}
