import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudComponent } from './solicitud.component';
import { RealizarComponent } from './realizar/realizar.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { AprobacionComponent } from './aprobacion/aprobacion.component';
import { CorreccionesComponent } from './correcciones/correcciones.component';
import { ListarAdministracionComponent } from './listar-administracion/listar-administracion.component';
import { ListarPresupuestoComponent } from './listar-presupuesto/listar-presupuesto.component';
// import {ExampleComponent} from './example/example.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitudComponent,
    children: [
      {
        path: 'realizar',
        component: RealizarComponent,
      },
      {
        path: 'listar-administracion',
        component: ListarAdministracionComponent,
      },
      {
        path: 'listar-presupuesto',
        component: ListarPresupuestoComponent,
      },
      {
        path: 'administracion/:id',
        component: AdministracionComponent,
      },
      {
        path: 'presupuesto/:id',
        component: PresupuestoComponent,
      },
      {
        path: 'aprobacion',
        component: AprobacionComponent,
      },
      {
        path: 'correcciones',
        component: CorreccionesComponent,
      },
      // {
      //   path: 'example',
      //   component: ExampleComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class SolicitudRoutingModule { }
