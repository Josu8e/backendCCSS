import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombramientoRoutingModule } from './nombramiento-routing.module';
import { ModificarComponent } from './modificar/modificar.component';
import { NombramientoComponent } from './nombramiento.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NombramientoMostrarComponent } from './nombramiento-mostrar/nombramiento-mostrar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NombramientosService } from './nombramientos.service';
import { CrearNombramientoComponent } from './crear-nombramiento/crear-nombramiento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';
import { ToasterModule } from 'angular2-toaster';
import {NgxPaginationModule} from 'ngx-pagination';
import {FiltroPipe} from './filtro.pipe';


@NgModule({
  imports: [
    CommonModule,
    NombramientoRoutingModule,
    ThemeModule,
    ToasterModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  declarations: [ModificarComponent, NombramientoComponent, CrearNombramientoComponent, NombramientoMostrarComponent,
    NombramientoComponent, FiltroPipe],

  providers: [NombramientosService, ToasterManagerService, NgbActiveModal],
})
export class NombramientoModule { }
