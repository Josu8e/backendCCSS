import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples.component';
import { FirstExampleComponent } from './first-example/first-example.component';
import {ThemeModule} from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ExamplesRoutingModule,
    ThemeModule,
  ],
  declarations: [ExamplesComponent, FirstExampleComponent],
})
export class ExamplesModule { }
