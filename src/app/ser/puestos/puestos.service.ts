import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// models
import { Puesto } from '../models/Puesto';
import { PuestoServicio } from '../models/PuestoServicio';
import { environment } from '../../../environments/environment.prod';
@Injectable()
export class PuestosService {

  private apiPuestosObtenerListaPuestos = `http://${environment.server}/api/obtenerPuestos`;
  private apiPuestosObtenerInfoPuesto = `http://${environment.server}/api/obtenerInfoPuesto/`;
  private apiPuestosCrear = `http://${environment.server}/api/crearPuesto`;
  private apiPuestosEditar = `http://${environment.server}/api/editarPuesto/`;
  private apiPuestosEliminar = `http://${environment.server}/api/eliminarPuesto/`;
  private apiPuestosSegunIdServicio = `http://${environment.server}/api/obtenerPuestosSegunServicio/`;

  constructor(public _http: HttpClient) {
  }
  puestosObtenerLista(): Observable<PuestoServicio[]> {
    return this._http.get<PuestoServicio[]>(this.apiPuestosObtenerListaPuestos);
  }
  puestosObtenerInfoPuesto(id: number): Observable<Puesto> {
    const url = this.apiPuestosObtenerInfoPuesto + id;
    return this._http.get<Puesto>(url);
  }
  puestosCrear(puesto: Puesto): Observable<Puesto> {
    return this._http.post<Puesto>(this.apiPuestosCrear, puesto);
  }
  puestosEditar(puesto: Puesto): Observable<Puesto> {
    const url = this.apiPuestosEditar + puesto.id;
    return this._http.post<Puesto>(url, puesto);
  }
  puestosEliminar(id: number): Observable<Puesto> {
    const url = this.apiPuestosEliminar + id;
    return this._http.delete<Puesto>(url);
  }
  puestosSegunIdServicio(id: number): Observable<Puesto[]> {
    const url = this.apiPuestosSegunIdServicio + id;
    return this._http.get<Puesto[]>(url);
  }
}
