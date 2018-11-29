import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElegiblesComponent } from './elegibles.component';

// componentes del modulo
import { ElegiblesMostrarComponent } from './elegibles-mostrar/elegibles-mostrar.component';
import { ErrorHandleComponent } from './error-handle/error-handle.component';
import { PermissionErrorHandleComponent } from './permission-error-handle/permission-error-handle.component';
const routes: Routes = [
    {
        path: '',
        component: ElegiblesComponent,
        children: [
            {
                path: 'lista-elegibles',
                component: ElegiblesMostrarComponent,
            },
            {
                path: 'error-handle',
                component: ErrorHandleComponent,
            },
            {
                path: 'permission-error-handle',
                component: PermissionErrorHandleComponent,
            },
        ],
    },
];

/*
            {
                path: '',
                redirectTo: 'lista-elegibles',
                pathMatch: 'full',
            },
*/

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ElegiblesRoutingModule { }
