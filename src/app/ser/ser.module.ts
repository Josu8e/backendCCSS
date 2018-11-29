import { NgModule } from '@angular/core';

import { SERComponent} from './ser.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SERRoutingModule } from './ser-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ServiciosService } from '../ser/servicios/servicios.service';





const SER_COMPONENTS = [
  SERComponent,
];

@NgModule({
  imports: [
    SERRoutingModule,
    ThemeModule,
    DashboardModule,

  ],
  declarations: [
    ...SER_COMPONENTS,
  ],
  providers: [ServiciosService],
})
export class SERModule {
}
