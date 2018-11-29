import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type":"application/json"})
};

@Injectable()
export class SolicitudService {

  private listaPuestos = new BehaviorSubject([]);
  puestos = this.listaPuestos.asObservable();

  constructor(private http: HttpClient) { }

  actualizarPuestos(puestos) {
    this.listaPuestos.next(puestos);
  }

  getRealizarInfo(id:number):Observable<any>{
    const url = `http://${environment.server}/api/realizarHorasExtra/${id}`;
    return this.http.get<any>(url);
  }

  getListarAdministracionInfo():Observable<any>{
    const url = `http://${environment.server}/api/listarAdministracion`;
    return this.http.get<any>(url);
  }

  getListarPresupuestoInfo():Observable<any>{
    const url = `http://${environment.server}/api/listarPresupuesto`;
    return this.http.get<any>(url);
  }

  getAprobacionInfo():Observable<any>{
    const url = `http://${environment.server}/api/aprobacion`;
    return this.http.get<any>(url);
  }

  getAdministracionInfo(id:number):Observable<any>{
    const url = `http://${environment.server}/api/listarAdministracion/administracion/${id}`;
    return this.http.get<any>(url);
  }

  getPresupuestoInfo(id:number):Observable<any>{
    const url = `http://${environment.server}/api/listarPresupuesto/presupuesto/${id}`;
    return this.http.get<any>(url);
  }
  
  postRealizar(object:any):Observable<any>{
    const url = `http://${environment.server}/api/realizarHorasExtra/insertar`;
    return this.http.post<any>(url,object,httpOptions);
  }

  putAdministracionAprobar(object:any):Observable<any>{
    const url = `http://${environment.server}/api/listarAdministracion/administracion/aprobar`;
    return this.http.put<any>(url,object,httpOptions);
  }

  putAdministracionRechazar(object:any):Observable<any>{
    const url = `http://${environment.server}/api/listarAdministracion/administracion/rechazar`;
    return this.http.put<any>(url,object,httpOptions);
  }
  
  putPresupuesto(object:any):Observable<any>{
    const url = `http://${environment.server}/api/presupuesto/actualizar`;
    return this.http.put<any>(url,object,httpOptions);
  }

  putAprobacion(object:any):Observable<any>{
    const url = `http://${environment.server}/api/aprobacion/actualizar`;
    return this.http.put<any>(url,object,httpOptions);
  }

  getCorrecciones(id:number):Observable<any>{
    const url = `http://${environment.server}/api/correcciones/${id}`;
    return this.http.get<any>(url);
  }

  putCorrecciones(object:any){
    const url = `http://${environment.server}/api/correcciones/actualizar`;
    return this.http.put<any>(url,object,httpOptions);
  }
}
