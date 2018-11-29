import { Component, OnInit } from '@angular/core';
import {ReportePersonaService} from './reporte-persona.service';
import {Funcionario} from '../../auth/funcionario';

@Component({
  selector: 'ngx-reporte-persona',
  template: `<router-outlet></router-outlet>`,
})
export class ReportePersonaComponent implements OnInit {

  public funcionarios: Funcionario[];
  constructor(public reporteService: ReportePersonaService) { }

  ngOnInit() {
    this.reporteService.getFuncionarios().subscribe(users => { this.funcionarios = users})
  }
}
