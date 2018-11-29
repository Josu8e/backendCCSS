import { GlobalesService } from './../componentes-globales/globales.service';
import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS_ADMINISTRADOR_SISTEMA, MENU_ITEMS_RRHH, MENU_ITEMS_USUARIO } from './pages-menu';
import { NbMenuItem } from '@nebular/theme';
import { AuthService } from '../auth/auth.service';
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
export class SERComponent implements OnInit {
  menu: NbMenuItem[] = [];
  constructor(private authService: AuthService, private global: GlobalesService) { }
  ngOnInit(): void {
    // Roles del usuario para el sistema de registro de elegibles
    let roles = this.authService.getRoles().ser.split(',');
    // Roles disponibles
    let Roles = this.global.variablesGlobales.roles;

    for (let index in roles) {
      switch (roles[index]) {
        // Se concatenan los items de acuerdo al rol
        case Roles.JEFE_SERVICIO: {
          this.menu = _.uniqBy([...this.menu, ...MENU_ITEMS_USUARIO], 'title');
          break;
        }
        case Roles.SECRETARIA: {
          this.menu = _.uniqBy([...this.menu, ...MENU_ITEMS_ADMINISTRADOR_SISTEMA], 'title');
          break;
        }
        case Roles.RECURSOS_HUMANOS: {
          this.menu = _.uniqBy([...this.menu, ...MENU_ITEMS_RRHH], 'title');
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}
