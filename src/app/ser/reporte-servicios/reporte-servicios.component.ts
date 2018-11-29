import { Component, OnInit } from '@angular/core';
import {ReporteServiciosService} from './reporte-servicios.service';

@Component({
  selector: 'ngx-reporte-servicios',
  template: `<router-outlet></router-outlet>`,
})
export class ReporteServiciosComponent implements OnInit {

  // public listaFuncionariosPorPuesto: any[];

  constructor(public reporteServicioConst: ReporteServiciosService) {  }

  ngOnInit() {
  }

}
