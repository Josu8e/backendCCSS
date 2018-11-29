import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { configToasterManager } from '../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';
import { Auth } from '../auth';
import { Router } from '@angular/router';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';
import { GlobalesService } from '../../componentes-globales/globales.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  config = configToasterManager;
  user: any = {};

  constructor(private authService: AuthService, private router: Router,
    private toasterManagerService: ToasterManagerService, private globals: GlobalesService) { }

  onSubmit(form: NgForm) {
    // valida si los datos del formulario son validos
    if (form.valid) {
      // intenta loguear en el sistema
      this.authService.login(form.value).subscribe(
        // si fue exitoso setea la informacion del usuario logueado
        (data) => {
          this.authService.loadAuthData(data);
          // Si el usuario tiene acceso a los 2 sistemas se manda a la vista de elegir
          // en caso contrario se carga el sistema en el que tiene acceso
          if (data.acceso['stepi'] && data.acceso['ser']) {
            this.globals.variablesGlobales['accesoDual'] = true;
            this.router.navigate(['/auth/elegir-sistema']);
          }
          else if (data.acceso['stepi']) {
            this.router.navigate(['/stepi']);
          }
          else if (data.acceso['stepi']) {
            this.router.navigate(['/ser']);
          }
        },
        (error) => {
          switch (error.status) {
            // el servidor no se encuentra disponible
            case 0: {
              this.toasterManagerService.makeToast('error', 'Error'
                , 'Error en la conexion con el servidor.');
              break;
            }
            // las credenciales suministradas no concuerdan con ningun usuario
            case 401: {
              this.toasterManagerService.makeToast('error', 'Error'
                , 'No existe un usuario con las credenciales ingresadas.');
              break;
            }
            default: {

              break;
            }
          }
        },
      );
    }
  }
}
