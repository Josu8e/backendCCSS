import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteServiciosRoutingModule } from './reporte-servicios-routing.module';
import { SeleccionarServicioComponent } from './seleccionar-servicio/seleccionar-servicio.component';
import { FiltroPipe } from './filtro.pipe';
import { ReporteServiciosComponent } from './reporte-servicios.component';
import { ReporteServiciosService } from './reporte-servicios.service';
import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PuestosPorServicioComponent } from './puestos-por-servicio/puestos-por-servicio.component';

@NgModule({
  imports: [
    CommonModule,
    ReporteServiciosRoutingModule,
    ThemeModule,
    ToasterModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  declarations: [SeleccionarServicioComponent, FiltroPipe, ReporteServiciosComponent, PuestosPorServicioComponent],
  providers: [ReporteServiciosService],
})
export class ReporteServiciosModule { }
