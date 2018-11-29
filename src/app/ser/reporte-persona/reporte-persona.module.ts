import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportePersonaRoutingModule } from './reporte-persona-routing.module';
import { ReportePersonaComponent } from './reporte-persona.component';
import { MostrarReportePersonaComponent } from './mostrar-reporte-persona/mostrar-reporte-persona.component';
import {ThemeModule} from '../../@theme/theme.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {FiltroPipe} from './filtro.pipe';
import {ToasterModule} from 'angular2-toaster';
import {ToasterManagerService} from '../../@core/toast/toaster-manager.service';
import {ReportePersonaService} from './reporte-persona.service';
import { ReporteCompletoComponent } from './reporte-completo/reporte-completo.component';
@NgModule({
  imports: [
    CommonModule,
    ReportePersonaRoutingModule,
    ThemeModule,
    NgxPaginationModule,
    ToasterModule.forRoot(),
  ],
  declarations: [ReportePersonaComponent, MostrarReportePersonaComponent, FiltroPipe, ReporteCompletoComponent],

  providers: [ToasterManagerService, ReportePersonaService],
})
export class ReportePersonaModule { }
