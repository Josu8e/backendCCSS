import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudComponent } from './solicitud.component';
// import { ExampleComponent } from './example/example.component';
import { RealizarComponent } from './realizar/realizar.component';
import { ThemeModule } from '../../../@theme/theme.module';
// import {Ng2SmartTableModule} from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ModalRealizarComponent } from './modal-realizar/modal-realizar.component';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from './solicitud.service';
// import { CustomMinDirective } from './customMin.directive';
// import { CustomMaxDirective } from './customMax.directive';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ModalAutorizarComponent } from './modal-autorizar/modal-autorizar.component';
import { ModalPresupuestarComponent } from './modal-presupuestar/modal-presupuestar.component';
import { AprobacionComponent } from './aprobacion/aprobacion.component';
import { ModalRetroalimentacionComponent } from './modal-retroalimentacion/modal-retroalimentacion.component';
import { CorreccionesComponent } from './correcciones/correcciones.component';
import { ModalCorreccionesComponent } from './modal-correcciones/modal-correcciones.component';
import { NgxPaginationModule } from "ngx-pagination";
// import { FiltroPipe } from './filtro.pipe';
import { ListarAdministracionComponent } from './listar-administracion/listar-administracion.component';
import { ListarPresupuestoComponent } from './listar-presupuesto/listar-presupuesto.component';
import {ToasterManagerService} from '../../../@core/toast/toaster-manager.service';
import {ToasterModule} from 'angular2-toaster';
import { ModalObservacionesComponent } from './modal-observaciones/modal-observaciones.component';
import { HorasExtraModule } from "../horas-extra.module";
import { ModalModificarComponent } from './modal-modificar/modal-modificar.component';
import { ModalConfirmacionService } from '../../../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import { ModalConfirmacionComponent } from '../../../componentes-globales/modal-confirmacion/modal-confirmacion.component';
// import {ExampleComponent} from "./example/example.component";

@NgModule({
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    ThemeModule,
    HorasExtraModule,
    // Ng2SmartTableModule,
    FormsModule,
    NgxPaginationModule,
    ToasterModule.forRoot() ,
  ],
  // ExampleComponent
  declarations: [SolicitudComponent, RealizarComponent, ModalRealizarComponent, ModalAutorizarComponent, 
    ModalPresupuestarComponent, ModalRetroalimentacionComponent, ModalCorreccionesComponent,
    PresupuestoComponent, AdministracionComponent,ModalPresupuestarComponent, AprobacionComponent,
    CorreccionesComponent, ListarAdministracionComponent, ListarPresupuestoComponent, ModalObservacionesComponent,
    ModalModificarComponent],
  providers: [SmartTableService, SolicitudService, ToasterManagerService, ModalConfirmacionService],
  entryComponents: [ModalRealizarComponent, ModalAutorizarComponent, ModalPresupuestarComponent,
     ModalRetroalimentacionComponent, ModalCorreccionesComponent,
     ModalObservacionesComponent, ModalModificarComponent, ModalConfirmacionComponent],
})
export class SolicitudModule { }
