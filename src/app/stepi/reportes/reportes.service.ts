import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod'
import { Observable } from 'rxjs';

@Injectable()
export class ReportesService {

  api: string = `http://${environment.server}/api/`;

  constructor(private httpClient: HttpClient) { }

  obtenerServicios(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api.concat('mostrarServicios'), { responseType: 'json' });
  }

  obtenerHorasUtilizadasServicio(idServicio: string, mes: string, annio: string) {
    return fetch(this.api.concat(`conteo/reportes/horasUsadasPorServicio/${idServicio}/${mes}/${annio}`))
      .then((res) => {
        return res.json();
      });
  }

  obtenerHorasSolicitadasServicio(idServicio: string, mes: string, annio: string) {
    return fetch(this.api.concat(`conteo/reportes/horasAprobadas/${mes}/${annio}/${idServicio}`))
      .then((res) => {
        return res.json();
      });
  }

  obtenerEstadisticasMotivos(idServicio: string, mes: string, annio: string) {
    return fetch(this.api.concat(`conteo/reportes/porcentajeMotivoPorServicioPorMes/${idServicio}/${mes}/${annio}`))
      .then((res) => {
        return res.json();
      });
  }

  /**
   * Regresa la información de todos los funcionarios registrados en el sistema
   */
  obtenerFuncionarios(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api.concat('usuarios/funcionarios'), { responseType: 'json' });
  }

  obtenerAusenciasFuncionario(cedulaFuncionario: string) {
    return fetch(this.api.concat(`conteo/reportes/ausenciasPorPersona/${cedulaFuncionario}`))
      .then((res) => {
        return res.json();
      });
  }

}
