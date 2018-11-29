import { ChartModule } from 'angular2-chartjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { MotivosComponent } from './motivos/motivos.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ReportesComponent } from './reportes.component';
import { ChartistModule } from 'ng-chartist';
import { SolicitadasVsaprobadasComponent } from './solicitadas-vsaprobadas/solicitadas-vsaprobadas.component';
import { ReportesService } from './reportes.service';
import { AusenciasPersonaComponent } from './ausencias-persona/ausencias-persona.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AusenciasPersonaModule } from './ausencias-persona/ausencias-persona.module';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    ChartistModule,
    ReportesRoutingModule,
    ThemeModule,
    NgxPaginationModule,
    AusenciasPersonaModule,
    ChartModule
  ],
  declarations: [ReportesComponent, SolicitadasVsaprobadasComponent, MotivosComponent],
  providers: [ReportesService]
})
export class ReportesModule { }
