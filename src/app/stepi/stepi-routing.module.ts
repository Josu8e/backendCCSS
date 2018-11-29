import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { STEPIComponent } from './stepi.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorsComponent } from '../componentes-globales/authors/authors.component';

const routes: Routes = [{
  path: '',
  component: STEPIComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'horas-extra',
      loadChildren: './horas-extra/horas-extra.module#HorasExtraModule',
    },
    {
      path: 'usuarios',
      loadChildren: './usuarios/usuarios.module#UsuariosModule',
    },
    {
      path: 'conteo',
      loadChildren: './conteo/conteo.module#ConteoModule',
    },
    {
      path: 'funcionarios',
      loadChildren: './funcionarios/funcionarios.module#FuncionariosModule',
    },
    {
      path: 'autores',
      component: AuthorsComponent,
    }, 
    {
      path: 'reportes',
      loadChildren: './reportes/reportes.module#ReportesModule'
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class STEPIRoutingModule {
}
