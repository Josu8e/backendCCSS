import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExamplesComponent} from './examples.component';
import {FirstExampleComponent} from './first-example/first-example.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: 'first-example',
        component: FirstExampleComponent,
      },
      // Add the next components here
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule { }
