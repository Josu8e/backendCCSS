import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';
@Injectable()
export class ReporteServiciosService {

  // links APIs
  private urlNombreYCodigoServicios: string = `http://${environment.server}/api/obtenerNombreYCodigoServicios`;



  constructor(private http: HttpClient) { }


  obtenerNombreYCodigoServicios(): Observable<any[]> {
    return this.http.get<any>(this.urlNombreYCodigoServicios).catch(this.handleError);
  }

  puestosPorServicios(codigoServicio: number): Observable<any[]> {
    const url =`http://${environment.server}/api/puestosPorServicio/${codigoServicio}`;
    return this.http.get<any>(url).catch(this.handleError);
  }

  private handleError(error: any) {
    // console.error(error);
    return Observable.throw(error);
  }

}
