import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportePersonaComponent} from './reporte-persona.component';
import {MostrarReportePersonaComponent} from './mostrar-reporte-persona/mostrar-reporte-persona.component';
import {ReporteCompletoComponent} from './reporte-completo/reporte-completo.component';


const routes: Routes = [
  {
    path: '',
    component: ReportePersonaComponent,
    children: [
      {
        path: 'mostrarReportePersona',
        component: MostrarReportePersonaComponent,
      },
      {
        path: 'mostrarReporteCompleto/:cedula',
        component: ReporteCompletoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportePersonaRoutingModule { }
