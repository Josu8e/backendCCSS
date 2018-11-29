import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ElegiblesRoutingModule } from './elegibles-routing.module';
import { ElegiblesComponent } from './elegibles.component';

// componentes del modulo
import { ElegiblesMostrarComponent } from './elegibles-mostrar/elegibles-mostrar.component';
import { ErrorHandleComponent } from './error-handle/error-handle.component';
import { NombrarElegiblesComponent } from './nombrar-elegibles/nombrar-elegibles.component';
import { PermissionErrorHandleComponent } from './permission-error-handle/permission-error-handle.component';
// services
import { ElegiblesService } from './elegibles.service';
import { PuestosService } from '../puestos/puestos.service';
import { NombramientosService } from '../nombramiento/nombramientos.service';
// librerias
import { ToasterModule } from 'angular2-toaster';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';
// pipes
import { FiltroPipe } from './filtro.pipe';
// pagination
import { NgxPaginationModule } from 'ngx-pagination';

// validators

@NgModule({
  imports: [
    CommonModule,
    ElegiblesRoutingModule,
    ThemeModule,
    NgxPaginationModule,
    ToasterModule.forRoot(),
  ],
  declarations: [ElegiblesComponent, ElegiblesMostrarComponent,
    FiltroPipe, ErrorHandleComponent, NombrarElegiblesComponent,
    PermissionErrorHandleComponent],
  providers: [ToasterManagerService, ElegiblesService, PuestosService,
    NombramientosService],
  entryComponents: [NombrarElegiblesComponent],
})
export class ElegiblesModule { }
