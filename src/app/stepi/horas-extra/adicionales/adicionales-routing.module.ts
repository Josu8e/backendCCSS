import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdicionalesComponent } from './adicionales.component';
import { RealizarComponent } from './realizar/realizar.component';
import { ListarAdministracionComponent } from './listar-administracion/listar-administracion.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ListarPresupuestoComponent } from './listar-presupuesto/listar-presupuesto.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component'
import { AprobacionComponent } from './aprobacion/aprobacion.component';
import { CorreccionesComponent } from './correcciones/correcciones.component';

const routes: Routes = [
  {
    path:'',
    component:AdicionalesComponent,
    children:[
      {
        path: 'realizar',
        component: RealizarComponent
      },
      {
        path: 'listar-administracion',
        component: ListarAdministracionComponent
      },
      {
        path: 'administracion/:id',
        component: AdministracionComponent
      },
      {
        path: 'listar-presupuesto',
        component: ListarPresupuestoComponent
      },
      {
        path: 'presupuesto/:id',
        component: PresupuestoComponent
      },
      {
        path: 'aprobacion',
        component: AprobacionComponent
      },
      {
        path: 'correcciones',
        component: CorreccionesComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdicionalesRoutingModule { }
