import { FiltroPipeReportes } from './filtro.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AusenciasPersonaComponent } from './ausencias-persona.component';
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    NgxPaginationModule,
    ThemeModule
  ],
  declarations: [AusenciasPersonaComponent, FiltroPipeReportes]
})

export class AusenciasPersonaModule { }
