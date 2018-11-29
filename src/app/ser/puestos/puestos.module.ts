import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { PuestosRoutingModule } from './puestos-routing.module';
import { PuestosComponent } from './puestos.component';

 // componentes del modulo
import { PuestosMostrarComponent } from './puestos-mostrar/puestos-mostrar.component';
import { PuestosCrearComponent } from './puestos-crear/puestos-crear.component';
import { PuestosEditarComponent } from './puestos-editar/puestos-editar.component';
import { ErrorHandleComponent } from './error-handle/error-handle.component';

// services
import { PuestosService } from './puestos.service';
import { ServiciosService } from '../servicios/servicios.service';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';

// librerias
import { ToasterModule } from 'angular2-toaster';

// pipes
import { FiltroPipe } from './filtro.pipe';

// pagination
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    PuestosRoutingModule,
    ThemeModule,
    NgxPaginationModule,
    ToasterModule.forRoot(),
  ],
  declarations: [PuestosComponent, PuestosMostrarComponent,
    PuestosCrearComponent, PuestosEditarComponent, ErrorHandleComponent,
    FiltroPipe],
    providers: [PuestosService, ServiciosService, ToasterManagerService],
    entryComponents: [PuestosCrearComponent],
})
export class PuestosModule { }
