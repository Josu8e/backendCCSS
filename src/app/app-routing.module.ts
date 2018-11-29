import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {LogoutComponent} from './auth/logout/logout.component';
import {NotFoundComponent} from './componentes-globales/not-found/not-found.component';
import { ElegirSistemaComponent } from './auth/elegir-sistema/elegir-sistema.component';

const routes: Routes = [
  {path: 'stepi', loadChildren: 'app/stepi/stepi.module#STEPIModule', canActivate: [AuthGuard]},
  {path: 'ser', loadChildren: 'app/ser/ser.module#SERModule', canActivate: [AuthGuard]},
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [

      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'elegir-sistema',
        component: ElegirSistemaComponent,
        canActivate: [AuthGuard]
      }
    ],
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
