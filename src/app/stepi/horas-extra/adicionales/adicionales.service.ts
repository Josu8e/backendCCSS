import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type":"application/json"})
};

@Injectable()
export class AdicionalesService {

  private listaPuestos = new BehaviorSubject([]);
  puestos = this.listaPuestos.asObservable();

  constructor(private http:HttpClient) { }

  actualizarPuestos(puestos) {
    this.listaPuestos.next(puestos);
  }

  getRealizarInfo(id:number):Observable<any>{
    const url = `http://${environment.server}/api/realizarHorasAdicionales/${id}`;
    return this.http.get<any>(url);
  }

  postRealizar(object:any):Observable<any>{
    const url = `http://${environment.server}/api/realizarHorasAdicionales/insertar`;
    return this.http.post<any>(url,object,httpOptions);
  }

  getListarAdministracionInfo():Observable<any>{
    const url = `http://${environment.server}/api/listarAdministracion/horasAdicionales`;
    return this.http.get<any>(url);
  }

  getAdministracionInfo(id:number):Observable<any>{
    const url = `http://${environment.server}/api/listarAdministracion/administracion/horasAdicionales/${id}`;
    return this.http.get<any>(url);
  }

  putAdministracionActualizar(object:any):Observable<any>{
    const url = `http://${environment.server}/api/listarAdministracion/administracion/adicionales/actualizar`;
    return this.http.put<any>(url,object,httpOptions);
  }

  getCorrecciones(id:number):Observable<any>{
    const url = `http://${environment.server}/api/correcciones/horasAdicionales/${id}`;
    return this.http.get<any>(url);
  }

  putCorrecciones(object:any):Observable<any>{
    const url = `http://${environment.server}/api/correcciones/horasAdicionales/actualizar`;
    return this.http.put<any>(url,object,httpOptions);
  }

  getListarPresupuestoInfo(){
    const url = `http://${environment.server}/api/listarPresupuesto/horasAdicionales`;
    return this.http.get<any>(url);
  }

  getPresupuestoInfo(id:number):Observable<any>{
    const url = `http://${environment.server}/api/presupuesto/horasAdicionales/${id}`;
    return this.http.get<any>(url);
  }
  
  putPresupuesto(object:any):Observable<any>{
    const url = `http://${environment.server}/api/presupuesto/horasAdicionales/actualizar`;
    return this.http.put<any>(url,object,httpOptions);
  }
  
  getAprobacionInfo(){
    const url = `http://${environment.server}/api/aprobacion/horasAdicionales`;
    return this.http.get<any>(url);
  }

  putAprobacion(object:any):Observable<any>{
    const url = `http://${environment.server}/api/aprobacion/horasAdicionales/actualizar`;
    return this.http.put<any>(url,object,httpOptions);
  }
}
