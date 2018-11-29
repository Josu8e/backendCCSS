import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasExtraRoutingModule } from './horas-extra-routing.module';
import { HorasExtraComponent } from './horas-extra.component';
import { FiltroPipe } from './filtro.pipe';
import { CustomMaxDirective } from './customMax.directive';
import { CustomMinDirective } from './customMin.directive';
import { STEPIModule } from '../stepi.module';

@NgModule({
  imports: [
    CommonModule,
    HorasExtraRoutingModule,
    STEPIModule
  ],
  declarations: [HorasExtraComponent, FiltroPipe, CustomMaxDirective, CustomMinDirective],
  exports: [FiltroPipe, CustomMaxDirective, CustomMinDirective]
})
export class HorasExtraModule { }
