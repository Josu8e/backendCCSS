import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConteoComponent } from './conteo.component';
import { RealizarComponent } from './realizar/realizar.component';
const routes: Routes = [{
    path: '',
    component: RealizarComponent,
    children: [
        {
            path: '',
            component: RealizarComponent,
        },
        // Add the next components here
    ],
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConteoRoutingModule { }
