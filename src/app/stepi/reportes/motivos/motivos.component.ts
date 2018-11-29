import { ReportesService } from './../reportes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'motivos',
  templateUrl: './motivos.component.html',
  styleUrls: ['./motivos.component.scss']
})

export class MotivosComponent implements OnInit {

  chart: any;
  fecha: Date;
  servicios: Array<any>;
  servicioActual: any;
  // colores = ['#36A2EB', '#FF6384', '#36eb7e', '#ffeb3b', '#9c27b0'];
  mapColoresMotivos: Map<string, string> = new Map([['Incapacidad', '#36A2EB'],
  ['Permiso con goce salarial', '#FF6384'],
  ['Permiso sin goce salarial', '#36eb7e'],
  ['Producción', '#ffeb3b'],
  ['Otro', '#9c27b0']]);

  constructor(private reportesService: ReportesService) {
    // this.fecha = new Date();
    this.chart = {};
  }

  obtenerEstadisticas(datos: any[]) {
    let motivos = {
      'Incapacidad': 0,
      'Permiso con goce salarial': 0,
      'Permiso sin goce salarial': 0,
      'Producción': 0,
      'Otro': 0
    };
    let estadisticas = {
      'motivos': [],
      'porcentajes': []
    };
    let suma = 0;

    for (let i in datos) {
      motivos[datos[i].motivo] = motivos[datos[i].motivo] + 1;
    }

    for (let j in motivos) {
      if (motivos[j] > 0) {
        estadisticas.motivos.push(j);
        suma += motivos[j];
      }
    }

    for (let k in estadisticas.motivos) {
      estadisticas.porcentajes.push((motivos[estadisticas.motivos[k]] / suma) * 100);
      // estadisticas.motivos[k] = `${estadisticas.motivos[k]} : ${(motivos[estadisticas.motivos[k]] / suma) * 100}%`;
    }

    return estadisticas;
  }

  serviciosObserver = {
    next: registro => { this.servicios = registro },
    complete: () => {
      console.log(this.servicios);
    }
  }

  async consultar() {
    console.log(this.fecha);
    let fecha = new Date(this.fecha);
    let mes = (fecha.getMonth() + 1).toString();
    let annio = fecha.getFullYear().toString();
    let datos = await this.reportesService.obtenerEstadisticasMotivos(this.servicioActual.id, mes, annio);
    let estadisticas = this.obtenerEstadisticas(datos);
    this.chart = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: estadisticas.porcentajes,
          backgroundColor: estadisticas.motivos.map(x => this.mapColoresMotivos.get(x))
        }],
        labels: estadisticas.motivos
      },
      options: {
        responsive: true
      }
    }
  }

  async ngOnInit() {
    await this.reportesService.obtenerServicios()
      .subscribe(this.serviciosObserver);
  }
}
