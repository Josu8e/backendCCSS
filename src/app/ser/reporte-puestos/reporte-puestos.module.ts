import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportePuestosRoutingModule } from './reporte-puestos-routing.module';
import { FuncionariosPorPuestoComponent } from './funcionarios-por-puesto/funcionarios-por-puesto.component';
import { ReportePuestosComponent } from './reporte-puestos.component';
import {ReportePuestosService} from './reporte-puestos.service';
import {ThemeModule} from '../../@theme/theme.module';
import {ToasterModule} from 'angular2-toaster';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { SeleccionarPuestoComponent } from './seleccionar-puesto/seleccionar-puesto.component';
import { FiltroPipe } from './filtro.pipe';


@NgModule({
  imports: [
    CommonModule,
    ReportePuestosRoutingModule,
    ThemeModule,
    ToasterModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  declarations: [FuncionariosPorPuestoComponent, ReportePuestosComponent, SeleccionarPuestoComponent, FiltroPipe],
  providers: [ReportePuestosService],
})
export class ReportePuestosModule { }
