import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ReporteServiciosService} from '../reporte-servicios.service';
import {ActivatedRoute} from '@angular/router';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'ngx-puestos-por-servicio',
  templateUrl: './puestos-por-servicio.component.html',
  styleUrls: ['./puestos-por-servicio.component.scss'],
})
export class PuestosPorServicioComponent implements OnInit {

  private codigoServicio;
  @ViewChild('page') page: ElementRef;

  public listaPuestosPorServicio: any[];

  constructor(public repoServiciosServ: ReporteServiciosService, private _route: ActivatedRoute) {  }

  ngOnInit() {
    this.codigoServicio = +this._route.snapshot.paramMap.get('codigoServicio');
    this.serviciosCargarLista();
  }


  serviciosCargarLista(): void {
    this.repoServiciosServ.puestosPorServicios(this.codigoServicio)
      .subscribe(
        success => {
          this.listaPuestosPorServicio = success;
          window.console.log(this.listaPuestosPorServicio);
        },
        err => {
          window.console.log('error');
          // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
      );
  }


  public downloadPdf(): void {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      },
    };
    const content = this.page.nativeElement;
    doc.fromHTML(content, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers,
    });
    doc.save('reportePorServicio.pdf');
  }


}
