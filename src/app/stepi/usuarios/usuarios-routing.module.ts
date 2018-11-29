import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuariosComponent} from './usuarios.component';
import {ConsultarComponent} from './consultar/consultar.component';
const routes: Routes = [  {
  path: '',
  component: UsuariosComponent,
  children: [
    {
      path: 'consultar',
      component: ConsultarComponent,
    },
    // Add the next components here
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule { }
