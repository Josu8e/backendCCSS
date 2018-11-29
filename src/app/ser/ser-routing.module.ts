import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SERComponent } from './ser.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: SERComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'elegibles',
      loadChildren: './elegibles/elegibles.module#ElegiblesModule',
    },
    {
      path: 'nombramiento',
      loadChildren: './nombramiento/nombramiento.module#NombramientoModule',
    },
    {
      path: 'servicios',
      loadChildren: './servicios/servicios.module#ServiciosModule',
    },
    {
      path: 'reportePuestos',
      loadChildren: './reporte-puestos/reporte-puestos.module#ReportePuestosModule',
    },
    {
      path: 'reporteServicios',
      loadChildren: './reporte-servicios/reporte-servicios.module#ReporteServiciosModule',
    },
    {
      path: 'puestos',
      loadChildren: './puestos/puestos.module#PuestosModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'puestos',
      loadChildren: './puestos/puestos.module#PuestosModule',
    },
    {
      path: 'reportePersona',
      loadChildren: './reporte-persona/reporte-persona.module#ReportePersonaModule',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SERRoutingModule {
}
