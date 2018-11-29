import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotivosComponent } from './motivos.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule
  ],
  declarations: [MotivosComponent]
})
export class MotivosModule { }
