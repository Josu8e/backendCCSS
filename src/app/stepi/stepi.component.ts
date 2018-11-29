import { GlobalesService } from './../componentes-globales/globales.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import {
  MENU_ITEMS_ADMINISTRADOR_SISTEMA,
  MENU_ITEMS_ADMINISTRATIVO,
  MENU_ITEMS_PRESUPUESTO, MENU_ITEMS_SUPERVISOR,
  MENU_ITEMS_USUARIO,
} from './pages-menu';

import { AuthService } from '../auth/auth.service';
import { NbMenuItem } from '@nebular/theme';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})

export class STEPIComponent implements OnInit {
  menu: NbMenuItem[] = [];
  constructor(private authService: AuthService, private global: GlobalesService) { }
  ngOnInit(): void {
    // Roles del usuario para el sistema de horas extra
    let roles = this.authService.getRoles().stepi.split(',');
    // Roles disponibles
    let Roles = this.global.variablesGlobales.roles;
    for (let index in roles) {
      switch (roles[index]) {
        case Roles.JEFE_SERVICIO: {
          // Jefe de servicio
          this.menu = _.uniqBy([...this.menu, ...MENU_ITEMS_USUARIO], 'title');
          break;
        }
        case Roles.SECRETARIA: {
          // Secretaria
          this.menu = _.uniqBy([...this.menu, ...MENU_ITEMS_ADMINISTRADOR_SISTEMA], 'title');
          break;
        }
        case Roles.PRESUPUESTO: {
          // Presupuesto
          this.menu = _.uniqBy([...this.menu, ...MENU_ITEMS_PRESUPUESTO], 'title');
          break;
        }
        case Roles.ADMINISTRATIVO: {
          // Administrativo
          this.menu = _.uniqBy([...this.menu, ...MENU_ITEMS_ADMINISTRATIVO], 'title');
          break;
        }
        case Roles.SUPERVISOR: {
          // Supervisor
          this.menu = _.uniqBy([...this.menu, ...MENU_ITEMS_SUPERVISOR], 'title');
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}
