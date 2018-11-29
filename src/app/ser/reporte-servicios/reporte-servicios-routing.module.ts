import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReporteServiciosComponent} from './reporte-servicios.component';
import {SeleccionarServicioComponent} from './seleccionar-servicio/seleccionar-servicio.component';
import {PuestosPorServicioComponent} from './puestos-por-servicio/puestos-por-servicio.component';

const routes: Routes = [
  {
    path: '',
    component: ReporteServiciosComponent,
    children: [
      {
        path: 'puestoPorServicio/:codigoServicio',
        component: PuestosPorServicioComponent,
      },
      {
        path: 'seleccionarServicio',
        component: SeleccionarServicioComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteServiciosRoutingModule { }
