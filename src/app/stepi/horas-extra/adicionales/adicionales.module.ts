import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasExtraModule } from "../horas-extra.module";
import { NgxPaginationModule } from "ngx-pagination";
import { ToasterManagerService} from '../../../@core/toast/toaster-manager.service';
import { ToasterModule} from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { AdicionalesRoutingModule } from './adicionales-routing.module';
import { AdicionalesComponent } from './adicionales.component';
import { RealizarComponent } from './realizar/realizar.component';
import { ModalRealizarComponent } from './modal-realizar/modal-realizar.component';
import { ListarAdministracionComponent } from './listar-administracion/listar-administracion.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ModalAutorizarComponent } from './modal-autorizar/modal-autorizar.component';
import { ModalRetroalimentacionComponent } from './modal-retroalimentacion/modal-retroalimentacion.component';
import { ModalObservacionesComponent } from './modal-observaciones/modal-observaciones.component';
import { ListarPresupuestoComponent } from './listar-presupuesto/listar-presupuesto.component';
import { ModalPresupuestarComponent } from './modal-presupuestar/modal-presupuestar.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { AprobacionComponent } from './aprobacion/aprobacion.component';
import { ModalAprobarComponent } from './modal-aprobar/modal-aprobar.component';
import { ModalCorreccionesComponent } from './modal-correcciones/modal-correcciones.component';
import { CorreccionesComponent } from './correcciones/correcciones.component';
import { ModalModificarComponent } from './modal-modificar/modal-modificar.component';
import { AdicionalesService } from './adicionales.service';
import { ModalConfirmacionComponent } from '../../../componentes-globales/modal-confirmacion/modal-confirmacion.component';
import { ModalConfirmacionService } from '../../../componentes-globales/modal-confirmacion/modal-confirmacion.service';

@NgModule({
  imports: [
    CommonModule,
    AdicionalesRoutingModule,
    ThemeModule,
    HorasExtraModule,
    NgxPaginationModule,
    ToasterModule.forRoot()
  ],
  declarations: [AdicionalesComponent, RealizarComponent, ModalRealizarComponent,
    ListarAdministracionComponent, AdministracionComponent, ModalAutorizarComponent,
    ModalRetroalimentacionComponent, ModalObservacionesComponent, ListarPresupuestoComponent,
    ModalPresupuestarComponent, PresupuestoComponent, AprobacionComponent, ModalAprobarComponent,
    ModalCorreccionesComponent, CorreccionesComponent, ModalModificarComponent],
  providers: [ToasterManagerService, AdicionalesService, ModalConfirmacionService],
  entryComponents: [ModalRealizarComponent, ModalAutorizarComponent, ModalRetroalimentacionComponent,
     ModalObservacionesComponent, ModalPresupuestarComponent, ModalConfirmacionComponent,
     ModalCorreccionesComponent, ModalModificarComponent]
})
export class AdicionalesModule { }
