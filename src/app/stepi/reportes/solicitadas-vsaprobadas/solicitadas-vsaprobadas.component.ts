import { ReportesService } from './../reportes.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'solicitadas-vsaprobadas',
  templateUrl: './solicitadas-vsaprobadas.component.html',
  styleUrls: ['./solicitadas-vsaprobadas.component.scss']
})

export class SolicitadasVsaprobadasComponent implements OnInit {

  public charts: any[];
  public servicios: any;
  public fecha: Date;

  constructor(private reportesService: ReportesService) {
    this.charts = [];
  }

  observerServicios = {
    next: registros => { this.servicios = registros },
    complete: async () => {

    }
  }

  async consultar() {
    let spinner = document.getElementsByClassName('lds-roller')[0] as HTMLElement;
    spinner.style.visibility = 'visible';
    let estadisticas = await this.obtenerEstadisticasServicios();
    let labels = _.chunk(estadisticas.servicios, 10);
    let series1 = _.chunk(estadisticas.horas_solicitadas, 10);
    let series2 = _.chunk(estadisticas.horas_utilizadas, 10);

    for (let i in labels) {
      this.charts.push({
        type: 'bar',
        data: {
          labels: labels[i],
          datasets: [
            {
              label: 'Horas aprobadas',
              data: series1[i],
              backgroundColor: '#e21e30'
            },
            {
              label: 'Horas utilizadas',
              data: series2[i],
              backgroundColor: '#0062a1'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true
            }]
          },
          zoom: {
            enabled: false
          }
        }
      });
    }
    spinner = document.getElementsByClassName('lds-roller')[0] as HTMLElement;
    spinner.style.visibility = 'hidden';
  }

  async obtenerEstadisticasServicios() {
    let fecha = new Date(this.fecha);
    let mes = (fecha.getMonth() + 1).toString();
    let annio = fecha.getFullYear().toString();

    let estadisticas = {
      servicios: [],
      horas_solicitadas: [],
      horas_utilizadas: []
    }
    for (let i in this.servicios) {

      try {
        let horasSolicitadas = await this.reportesService.obtenerHorasSolicitadasServicio(mes, annio, this.servicios[i].id);
        let horasUsadas = await this.reportesService.obtenerHorasUtilizadasServicio(this.servicios[i].id, mes, annio);
        let horasSolicitadasTotales = (horasSolicitadas[0]) ? horasSolicitadas[0].HorasExtra + horasSolicitadas[0].HorasExtraAdicionales : 0;
        estadisticas.horas_solicitadas.push(horasSolicitadasTotales);
        estadisticas.horas_utilizadas.push(horasUsadas[0].horasTotales);
        estadisticas.servicios.push(this.servicios[i].nombre);
      }
      catch (e) { }
    }

    return estadisticas;
  }

  ngOnInit() {
    this.reportesService.obtenerServicios()
      .subscribe(this.observerServicios);
  }

}
