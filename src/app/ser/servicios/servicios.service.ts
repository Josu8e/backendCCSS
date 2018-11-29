import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Servicio } from '../../ser/models/Servicio';
import { environment } from '../../../environments/environment.prod';
const cudOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable()
export class ServiciosService {
  // API del Back-end
  private urlMostrarServiciosPuestos: string =  `http://${environment.server}/api/obtenerServiciosPuestos`;
  private urlMostrarServicios: string =  `http://${environment.server}/api/mostrarServicios`;
  private urlCrearServicios: string =  `http://${environment.server}/api/crearServicios`;
  private urlModificarServicios: string =  `http://${environment.server}/api/modificarServicios/`;
  private urlEliminarServicios: string =  `http://${environment.server}/api/eliminarServicios/`;
  selectServicios: Servicio;
  
  constructor( private http: HttpClient) { }
  // se obtiene todos los servicios
  serviciosObtenerLista(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.urlMostrarServiciosPuestos);
  }
  getServicios (): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.urlMostrarServicios)
      .catch(this.handleError);
  }
  // obtiene un servicio en especifico, buscado por el nombre
  getServicio (nombre: string): Observable<Servicio> {
    const url = `${this.urlMostrarServicios}/${nombre}`;
    return this.http.get<Servicio>(url)
      .catch (this.handleError);
  }
  // crea el servicio
  servicioCrear(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.urlCrearServicios, servicio, cudOptions)
      .catch(this.handleError);
  }
  // modifica el servicio
  updateServicio (servicio: Servicio): Observable<Servicio> {
    const url = this.urlModificarServicios + servicio.id;
    return this.http.put<Servicio>(url, servicio, cudOptions)
      .catch(this.handleError);
  }

  serviciosEliminar(id: number): Observable<Servicio> {
    const url = this.urlEliminarServicios + id;
    return this.http.delete<Servicio>(url, cudOptions)
      .catch(this.handleError);
  }
  // elimina el servicio
  eliminarServicio (code): Observable<Servicio> {
    const url = this.urlEliminarServicios + code;
    return this.http.delete<Servicio>(url);
  }
  // manejo de errores
  private handleError (error: any) {
    console.error(error);
    return Observable.throw(error);
  }

}
