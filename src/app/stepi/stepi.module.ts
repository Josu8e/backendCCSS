import { NgModule } from '@angular/core';

import { STEPIComponent } from './stepi.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { STEPIRoutingModule } from './stepi-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ModalConfirmacionComponent } from '../componentes-globales/modal-confirmacion/modal-confirmacion.component';
import { ModalConfirmacionService } from '../componentes-globales/modal-confirmacion/modal-confirmacion.service';
import { AuthorsComponent } from '../componentes-globales/authors/authors.component';


const STEPI_COMPONENTS = [
  STEPIComponent,
];

@NgModule({
  imports: [
    STEPIRoutingModule,
    ThemeModule,
    DashboardModule
  ],
  declarations: [
    ...STEPI_COMPONENTS,
    ModalConfirmacionComponent,
    AuthorsComponent,
  ],
})
export class STEPIModule {
}
