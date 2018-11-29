import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FuncionariosRoutingModule} from './funcionarios-routing.module';
import {FuncionariosComponent} from './funcionarios.component';
import {InsertarComponent} from './insertar/insertar.component';
import {ThemeModule} from '../../@theme/theme.module';
import {ConsultarComponent} from './consultar/consultar.component';
import {FuncionariosService} from './funcionarios.service'
import {NgxPaginationModule} from 'ngx-pagination';
import {FiltroPipe} from './filtro.pipe';
import {VerificarCedula} from './verificar-cedula.directive';

import {ToasterManagerService} from '../../@core/toast/toaster-manager.service';
import {ToasterModule} from 'angular2-toaster';

import {ModalConfirmacionComponent} from '../../componentes-globales/modal-confirmacion/modal-confirmacion.component';
import {ModalConfirmacionService} from '../../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import {VerificarNumeroTarjetaDirective} from './verificar-numero-tarjeta.directive';
import {VerificarCorreoDirective} from './verificar-correo.directive';
import {STEPIModule} from '../stepi.module';

@NgModule({
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    ThemeModule,
    NgxPaginationModule,
    ToasterModule.forRoot(),
    STEPIModule,
  ],
  declarations: [FuncionariosComponent, InsertarComponent, ConsultarComponent,
    FiltroPipe, VerificarCedula, VerificarNumeroTarjetaDirective, VerificarCorreoDirective],
  providers: [FuncionariosService, ToasterManagerService, ModalConfirmacionService],
  entryComponents: [InsertarComponent, ModalConfirmacionComponent],
})
export class FuncionariosModule {
}
