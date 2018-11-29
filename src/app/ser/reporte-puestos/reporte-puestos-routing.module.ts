import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionariosPorPuestoComponent } from './funcionarios-por-puesto/funcionarios-por-puesto.component';
import { ReportePuestosComponent } from './reporte-puestos.component';
import { SeleccionarPuestoComponent } from './seleccionar-puesto/seleccionar-puesto.component';

const routes: Routes = [
  {
    path: '',
    component: ReportePuestosComponent,
    children: [
      {
        path: 'funcionarioPorPuesto/:codigoPuesto',
        component: FuncionariosPorPuestoComponent ,
      },
      {
        path: 'seleccionarPuesto',
        component: SeleccionarPuestoComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportePuestosRoutingModule { }
