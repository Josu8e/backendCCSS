import { AusenciasPersonaComponent } from './ausencias-persona/ausencias-persona.component';
import { MotivosComponent } from './motivos/motivos.component';
import { ReportesComponent } from './reportes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitadasVsaprobadasComponent } from './solicitadas-vsaprobadas/solicitadas-vsaprobadas.component';

const routes: Routes = [
    {
        path: '',
        component: ReportesComponent,
        children: [
            {
                path: 'solicitadas-vsaprobadas',
                component: SolicitadasVsaprobadasComponent
            },
            {
                path: 'porcentaje-motivos',
                component: MotivosComponent
            },
            {
                path: 'ausencias-persona',
                component: AusenciasPersonaComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportesRoutingModule { }