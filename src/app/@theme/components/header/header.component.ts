import { GlobalesService } from './../../../componentes-globales/globales.service';
import 'rxjs/add/operator/pairwise';
import { Component, Input, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;
  sistema = this.globals.variablesGlobales['sistemaActual']
  userMenu = this.makeMenu();

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private authService: AuthService,
    private router: Router,
    private globals: GlobalesService) {

    // Se subscribe el componente al cambio de ruta para que detecte cuando se pasa de SER a STEPI
    // o viceversa y actualice el logo y demás componentes globales
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {

        if (event.url === '/stepi' || event.url === '/stepi/dashboard') {
          this.updateComponents('STEPI');
        }

        if (event.url === '/ser' || event.url === '/ser/dashboard') {
          this.updateComponents('SER');
        }

      }
    });
  }

  ngOnInit() {
    this.user = this.authService.getFuncionario();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  updateComponents(sistema: string) {
    this.globals.variablesGlobales['sistemaActual'] = sistema;
    this.sistema = this.globals.variablesGlobales['sistemaActual'];
    this.userMenu = this.makeMenu();
  }

  makeMenu(): any[] {

    let singleRolMenu = [{ title: 'Cerrar Sesion', link: '/auth/logout' }];

    let multipleRolMenu = [
      { title: `Cambiar a ${this.sistema === 'STEPI' ? 'SER' : 'STEPI'}`, link: `/${this.sistema === 'STEPI' ? '/ser/dashboard' : '/stepi/dashboard'}` },
      { title: 'Cerrar Sesion', link: '/auth/logout' }
    ];

    let menu = this.globals.variablesGlobales['accesoDual'] ? multipleRolMenu : singleRolMenu;

    return menu;
  }
}
