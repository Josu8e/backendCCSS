import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // if (!environment.production) {
    //   return true;
    // }
    // si el objeto auth es igual a null, quiere decir que no hay un usuario logueado en el
    // sistema por lo que redirige al componente de login
    if (this.authService.getAuth().getValue() == null) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
