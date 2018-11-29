import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {Nombramiento} from '../models/Nombramiento';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Puesto} from '../models/Puesto';
import {Funcionario} from '../../auth/funcionario';
import { environment } from '../../../environments/environment.prod';

const cudOptions = {headers: new HttpHeaders({'content-type': 'application/json'})};

@Injectable()
export class NombramientosService {

  // Links de las apis
  private nomUrl: string = `http://${environment.server}/api/mostrarNombramientos`;
  private editUrl: string = `http://${environment.server}/api/editarNombramiento/`;
  private urlCrearNombramientos: string = `http://${environment.server}/api/crearNombramiento`;
  private urlObtenerFuncionario = `http://${environment.server}/api/obtenerFuncionarios`; // cedula, primer y segundo apellido
  private urlObtenerCedulaFuncionarios = `http://${environment.server}/api/cedulaFuncionarios`;
  private urlObtenerFuncionarioNombreApellidos = `http://${environment.server}/api/obtenerNombreFuncionarios`;
  private urlObtenerCodigoPuestos = `http://${environment.server}/api/obtenerCodigoPuestos`;
  // private urlCrearNombramientos: string = `http://localhost:8000/api/desarrollo`;
  private urlObtenerPuesto = `http://${environment.server}/api/obtenerPuestos`;
  private urlInhabilitarNombramiento: string = `http://${environment.server}/api/eliminarNombramiento/`;
  private urlObtenerCedulas: string = `http://${environment.server}/api/obtenerFuncionarios`;
  private urlBuscaFuncionarioNombramiento: string = `http://${environment.server}/api/buscarFuncionarioNombramiento/`;

  selectNombramiento: Nombramiento;

  constructor(private http: HttpClient) {
  }

  getNom(): Observable<Nombramiento[]> {
    return this.http.get<Nombramiento[]>(this.nomUrl)
  }

  updateNombramiento(nombramiento: Nombramiento) {
    const editartUrl = this.editUrl + nombramiento.id;
    return this.http.put<Nombramiento>(editartUrl, nombramiento)
  }

  nombramientoCrear(nombramiento: Nombramiento): Observable<Nombramiento> {
    return this.http.post<Nombramiento>(this.urlCrearNombramientos, nombramiento)
  }

  puestosObtenerLista(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(this.urlObtenerPuesto).catch(this.handleError);
  }

  // obetener cedula
  funcionariosObtenerLista(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.urlObtenerFuncionario).catch(this.handleError);
  }

  // obetener lista con cedulas de funcionarios
  funcionariosObtenerCedulasLista(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.urlObtenerCedulaFuncionarios).catch(this.handleError);
  }

  funcionariosObtenerNombreApellidos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.urlObtenerFuncionarioNombreApellidos).catch(this.handleError);
  }

  // obtener el codigo de los puestos del sistema
  puestosObtenerCodigo(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(this.urlObtenerCodigoPuestos).catch(this.handleError);
  }


  private handleError (error: any) {
    console.error(error);
    return Observable.throw(error);
  }
  // antiguo
  updateServicio(code): Observable<Nombramiento> {
    const InhabilitarNombramiento = this.urlInhabilitarNombramiento + code;
    return this.http.put<Nombramiento>(InhabilitarNombramiento, code, cudOptions).catch(this.handleError);
  }

  eliminarNombramiento (code): Observable<Nombramiento> {
    const url = this.urlInhabilitarNombramiento + code;
    return this.http.delete<Nombramiento>(url);
  }

  getCedulaFuncionario(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.urlObtenerCedulas)
  }

  verificaNombramiento(cedula, fecha_fin): Observable<any> {
    const verificaEstado = this.urlBuscaFuncionarioNombramiento + cedula + '/' + fecha_fin;
    return this.http.get<any>(verificaEstado, cedula).catch(this.handleError);
  }
}
