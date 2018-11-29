import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Funcionarios, solicitudActual, Solicitud } from '../conteo/conteo';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class ConteoService {

  // API de pruebas
  api: string = `http://${environment.server}/api/conteo/prueba/`;
  // API final
  api2: string = `http://${environment.server}/api/conteo/`;

  constructor(
    private http: HttpClient, private authService: AuthService) { }

  consultarFuncionarios(): Observable<Funcionarios[]> {
    return this.http.get<Funcionarios[]>(this.api.concat('ListaDeFuncionarios/' + this.authService.getFuncionario().cedula), { responseType: 'json' });
  }

  obtenerNombreServicio() {
    return this.http.get(this.api.concat('obtenerServicio/' + this.authService.getFuncionario().cedula), { responseType: 'json' });
  }

  obtenerPuestos(idServicio: string): Observable<any[]> {
    return this.http.get<any[]>(`http://${environment.server}/api/puestosPorServicio/` + idServicio, { responseType: 'json' });
  }


  // insertarRegistro(solicitudActual: solicitudActual) {
  //   return this.http.post(this.api.concat('insertarRegistro'), solicitudActual, { responseType: 'json' })
  // }

  // FIXME: modificar rutas para usar un solo API
  insertarRegistro(solicitudActual: Solicitud) {
    return this.http.post(this.api2.concat('insertar'), solicitudActual, { responseType: 'json' });
  }

  // obtenerRegistrosConteo(): Observable<Funcionarios[]> {
  //   return this.http.get<Funcionarios[]>(this.api.concat('ListaRegistroConteo/' + this.authService.getFuncionario().cedula), { responseType: 'json' })
  // }

  obtenerRegistrosConteo(idServicio: string): Observable<any[]> {
    return this.http.get<any[]>(this.api2.concat('porpuesto/' + idServicio), { responseType: 'json' })
  }

  modificarRegistro(solicitudActual: solicitudActual) {
    return this.http.put(this.api.concat('actualizarRegistro'), solicitudActual, { responseType: 'json' })
  }
  eliminarRegistro(solicitudActual: solicitudActual) {
    return this.http.put(this.api.concat('eliminarRegistro'), solicitudActual, { responseType: 'json' })
  }


}
