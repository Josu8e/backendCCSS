import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosComponent} from './servicios.component';
import {MostrarComponent} from './mostrar/mostrar.component';
import {ServiciosCrearComponent} from './servicios-crear/servicios-crear.component';
import {ServiciosModificarComponent} from './servicios-modificar/servicios-modificar.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    children: [
      {
        path: 'mostrar',
        component: MostrarComponent,
      },
      {
        path: 'servicios-crear',
        component: ServiciosCrearComponent,
      },
      {
        path: 'servicios-modificar',
        component: ServiciosModificarComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosRoutingModule { }
