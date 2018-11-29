import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { MostrarComponent } from './mostrar/mostrar.component';
import { ServiciosComponent } from './servicios.component';
import {ThemeModule} from '../../@theme/theme.module';
import { ServiciosCrearComponent } from './servicios-crear/servicios-crear.component';
import { ServiciosModificarComponent } from './servicios-modificar/servicios-modificar.component';
import {HttpClientModule} from '@angular/common/http';
import {ToasterManagerService} from '../../@core/toast/toaster-manager.service';
import {ToasterModule} from 'angular2-toaster';
import {NgxPaginationModule} from 'ngx-pagination';
import {FiltroPipe} from './filtro.pipe';

@NgModule({
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    ThemeModule,
    HttpClientModule,
    ToasterModule.forRoot(),
    NgxPaginationModule,
  ],
  declarations: [MostrarComponent, ServiciosComponent, ServiciosCrearComponent, ServiciosModificarComponent, FiltroPipe],
  providers: [ToasterManagerService],
})
export class ServiciosModule { }
