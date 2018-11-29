import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment.prod';
@Injectable()
export class ReportePuestosService {

  // links APIs
  // private urlFuncionariosPorPesto: string = `http://localhost:8000/api/funcionariosPorPuesto/${codigoPuesto}`;
  private urlObtenerCodigoPuestos: string = `http://${environment.server}/api/obtenerCodigoPuestos`;
  private urlNombreYCodigoPuestos: string = `http://${environment.server}/api/obtenerNombreYCodigoPuestos`;

  constructor(private http: HttpClient) { }

  funcionariosPorPuesto(codigoPuesto: number): Observable<any[]> {
    // return this.http.get<any[]>(this.urlFuncionariosPorPesto).catch(this.handleError);

    const url = `http://${environment.server}/api/funcionariosPorPuesto/${codigoPuesto}`;
    return this.http.get<any>(url).catch(this.handleError);
  }

  obtenerNombreYCodigoPuestos(): Observable<any[]> {
    return this.http.get<any>(this.urlNombreYCodigoPuestos).catch(this.handleError);
  }


  puestosObtenerCodigo(): Observable<any[]> {
    return this.http.get<any[]>(this.urlObtenerCodigoPuestos).catch(this.handleError);
  }


  private handleError(error: any) {
    // console.error(error);
    return Observable.throw(error);
  }

}
