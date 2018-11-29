import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealizarComponent } from './realizar/realizar.component';
import { ConteoRoutingModule } from './conteo-routing.module';
import { ConteoComponent } from './conteo.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgregarModalComponent } from './agregar-modal/agregar-modal.component';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';
import { ToasterModule } from 'angular2-toaster';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConteoService } from './conteo.service';
import { ModalConfirmacionService } from '../../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import { ModalConfirmacionComponent } from '../../componentes-globales/modal-confirmacion/modal-confirmacion.component';
import { STEPIModule } from '../../stepi/stepi.module';

@NgModule({
  imports: [
    CommonModule,
    ConteoRoutingModule,
    NgxPaginationModule,
    ThemeModule,
    NgSelectModule,
    ToasterModule.forRoot(),
    STEPIModule,
  ],
  declarations: [RealizarComponent, ConteoComponent, AgregarModalComponent],
  entryComponents: [AgregarModalComponent, ModalConfirmacionComponent],
  providers: [ToasterManagerService, ConteoService, ModalConfirmacionService],
})

export class ConteoModule { }
