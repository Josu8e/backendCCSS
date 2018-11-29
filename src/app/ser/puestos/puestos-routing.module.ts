import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PuestosComponent } from './puestos.component';
 // componentes del modulo
import { PuestosMostrarComponent } from './puestos-mostrar/puestos-mostrar.component';
import { PuestosCrearComponent } from './puestos-crear/puestos-crear.component';
import { PuestosEditarComponent } from './puestos-editar/puestos-editar.component';
import { ErrorHandleComponent } from './error-handle/error-handle.component';

const routes: Routes = [
  {
    path: '',
    component: PuestosComponent,
    children: [
      {
        path: 'lista-puestos',
        component: PuestosMostrarComponent,
      },
      {
        path: 'crear-puesto',
        component: PuestosCrearComponent,
      },
      {
        // path: 'editar-puesto/:id',
        path: 'editar-puesto',
        component: PuestosEditarComponent,
      },
      {
        path: 'error-handle',
        component: ErrorHandleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuestosRoutingModule { }
