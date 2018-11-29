import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HorasExtraComponent} from './horas-extra.component';

const routes: Routes = [
  {
    path: '',
    component: HorasExtraComponent,
    children: [
      {
        path: 'solicitud',
        loadChildren: './solicitud/solicitud.module#SolicitudModule',
      },
      {
        path: 'adicionales',
        loadChildren: './adicionales/adicionales.module#AdicionalesModule',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorasExtraRoutingModule { }
