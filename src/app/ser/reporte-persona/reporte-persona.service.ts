import { Injectable } from '@angular/core';
import {Funcionario} from '../../auth/funcionario';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
@Injectable()
export class ReportePersonaService {
  // Dieferentes conexiones del front end con el backend

  private urlObtenerFuncionario: string = `http://${environment.server}/api/funcionarios/consultar`;
  constructor(private http: HttpClient) { }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.urlObtenerFuncionario);
  }

  getFuncionarioSeleccionado(id: number): Observable<any> {
    const url = `http://${environment.server}/api/mostrarFuncionarioCedula/${id}`;
    return this.http.get<any>(url);
  }

  getPuestosPorFuncionario(id: number): Observable<any[]> {
    const url = `http://${environment.server}/api/obtenerListaPuestosPersona/${id}`;
    return this.http.get<any[]>(url);
  }

  getInfo(cedula: string, id: number): Observable<any[]> {
    const url = `http://${environment.server}/api/buscarInformacionPuesto/${cedula}/${id}`;
    return this.http.get<any[]>(url);
  }
}
