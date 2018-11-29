import { Component, OnInit } from '@angular/core';
import {ReportePuestosService} from './reporte-puestos.service';

@Component({
  selector: 'ngx-reporte-puestos',
  template: `<router-outlet></router-outlet>`,
})
export class ReportePuestosComponent implements OnInit {

  public listaFuncionariosPorPuesto: any[];

  constructor(public reportePuestoConst: ReportePuestosService) {  }

  ngOnInit() {
  }

}
