import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Authorization } from './authorization';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Auth } from './auth';
import { Funcionario } from './funcionario';
import { ToasterManagerService } from '../@core/toast/toaster-manager.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class AuthService {
  private cachedRequests: Array<HttpRequest<any>> = [];
  /**
   * @type {BehaviorSubject<Auth>}
   * contiene la informacion del usuario que se logueo en el sistema el id,
   * los datos que este posee como funcionario
   */
  private authorization = new BehaviorSubject<Authorization>(null);
  private auth = new BehaviorSubject<Auth>(null);

  constructor(private router: Router, private httpClient: HttpClient,
    private toasterManagerService: ToasterManagerService) {
  }

  /**
   *
   * @returns {Authorization}
   */
  getAuthorization(): Authorization {
    return this.authorization.getValue();
  }

  /**
   *
   * @param {Authorization} authorization
   */
  setAuthorization(authorization: Authorization) {
    this.authorization.next(authorization);
  }

  /**
   *
   * @returns {number}
   */
  getUserId(): number {
    return this.auth.getValue().id;
  }

  /**
   *
   * @returns {Funcionario}
   */
  getFuncionario(): Funcionario {
    return this.auth.getValue().funcionario;
  }

  /**
   *
   * @returns {BehaviorSubject<Auth>}
   */
  getAuth(): BehaviorSubject<Auth> {
    return this.auth
  }

  /**
   *
   * @param {Auth} auth
   */
  setAuth(auth: Auth) {
    this.auth.next(auth);
  }

  /**
   *
   * @returns {string}
   */
  getAcceso(): string {
    return this.auth.getValue().acceso;
  }

  /**
   *
   * @returns {string}
   */
  getRoles(): any{
    return this.auth.getValue().roles;
  }

  /**
   *
   * @param {User} user
   * @returns {Observable<Auth>}
   */
  login(user: User): Observable<Auth> { 
    return this.httpClient.post<Auth>(`http://${environment.server}/api/auth/login`, user, httpOptions);
  }
  
  loadAuthData(data): void {
    this.setAuthorization(data.authorization);
    this.setAuth(data)
  }
  /**
   *
   * @returns {any}
   */
  refreshToken(): any {
    this.httpClient.post<Authorization>(`http://${environment.server}/api/auth/refresh`, null, httpOptions)
      .subscribe(
        (data) => {
          this.setAuthorization(data);
        },
        (error) => console.error(error),
      );
  }

  /**
   * funcion que renicia la informacion del usuario logueado y redirige al componente de login del sistema
   */
  logout() {
    this.auth.next(null);
    this.authorization.next(null);
    this.router.navigate(['auth/login']);
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
