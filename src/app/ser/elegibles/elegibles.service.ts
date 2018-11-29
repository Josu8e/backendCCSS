import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';

// models
import { Elegible } from '../models/Elegible';
import { Servicio } from '../models/Servicio';

// services
import { AuthService } from '../../auth/auth.service';
@Injectable()
export class ElegiblesService {

  private apiObtenerElegiblesPasivosActivos = `http://${environment.server}/api/elegibles/`;
  private apiObtenerListaElegibles = `http://${environment.server}/api/obtenerListaElegibles/`;
  private apiObtenerListaNombresFuncionarios = `http://${environment.server}/api/obtenerListaNombresFuncionarios`
  private apiObtenerServicioFuncionario = `http://${environment.server}/api/obtenerServicioFuncionario/`;
  private apiObtenerServicios = `http://${environment.server}/api/obtenerServicios`;

  constructor(public _http: HttpClient, private authService: AuthService) {
  }
  obtenerListaElegibles(idPuesto: string, fechaInicio: string,
    fechaFinal: string): Observable<Elegible[]> {
      const url = this.apiObtenerElegiblesPasivosActivos + idPuesto; //+ '/' + fechaInicio + '/' + fechaFinal;
      return this._http.get<Elegible[]>(url);
  }
  obtenerListaNombresFuncionarios(): any {
    return this._http.get<Array<string>>(this.apiObtenerListaNombresFuncionarios);
  }
  obtenerServicioFuncionario() {
    const url = this.apiObtenerServicioFuncionario + this.authService.getFuncionario().cedula;
    return this._http.get(url, { responseType: 'json' });
  }
  obtenerServicios(): Observable<Servicio[]> {
    return this._http.get<Servicio[]>(this.apiObtenerServicios);
  }
}
