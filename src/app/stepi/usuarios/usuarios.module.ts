import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from './usuarios.service'
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { InsertarComponent } from './insertar/insertar.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ConsultarComponent } from './consultar/consultar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { FiltroPipe } from './filtro.pipe';
import { VerificarFuncionarioDirective } from './verificar-funcionario.directive';
import { VerificarUsuarioDirective } from './verificar-usuario.directive';
import { ModalConfirmacionComponent } from '../../componentes-globales/modal-confirmacion/modal-confirmacion.component';
import { ModalConfirmacionService } from '../../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';
import { ToasterModule } from 'angular2-toaster';
import { STEPIModule } from '../../stepi/stepi.module';
import { NgMultiSelectDropDownModule  } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ThemeModule,
    NgxPaginationModule,
    NgSelectModule,
    ToasterModule.forRoot(),
    STEPIModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [UsuariosComponent, InsertarComponent, ConsultarComponent, FiltroPipe,
    VerificarFuncionarioDirective, VerificarUsuarioDirective],
  providers: [UsuariosService, ModalConfirmacionService, ToasterManagerService],
  entryComponents: [InsertarComponent, ModalConfirmacionComponent],
})
export class UsuariosModule { }
