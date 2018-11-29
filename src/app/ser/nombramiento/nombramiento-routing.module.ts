import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModificarComponent} from './modificar/modificar.component';
import {NombramientoMostrarComponent} from './nombramiento-mostrar/nombramiento-mostrar.component';
import {NombramientoComponent} from './nombramiento.component';
import {CrearNombramientoComponent} from './crear-nombramiento/crear-nombramiento.component';

const routes: Routes = [
  {
    path: '',
    component: NombramientoComponent,
    children: [
      {
      path: 'modificar',
      component: ModificarComponent,
    },
      {
        path: 'mostrar',
        component: NombramientoMostrarComponent,
      },
      {
        path: 'crear',
        component: CrearNombramientoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NombramientoRoutingModule { }
