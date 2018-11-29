// import { Component, OnInit } from '@angular/core';
import {ReportePuestosService} from '../reporte-puestos.service';
import 'style-loader!angular2-toaster/toaster.css';
import * as jsPDF from 'jspdf';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-funcionarios-por-puesto',
  templateUrl: './funcionarios-por-puesto.component.html',
  styleUrls: ['./funcionarios-por-puesto.component.scss'],
})
export class FuncionariosPorPuestoComponent implements OnInit {

  private codigoPuesto;
  @ViewChild('page') page: ElementRef;

  public listaFuncionariosPorPuesto: any[];

  constructor(public a: ReportePuestosService, private _route: ActivatedRoute) {  }


  ngOnInit() {
    this.codigoPuesto = +this._route.snapshot.paramMap.get('codigoPuesto');
    this.puestosCargarLista();

  }

  puestosCargarLista(): void {
    this.a.funcionariosPorPuesto(this.codigoPuesto)
      .subscribe(
        success => {
          this.listaFuncionariosPorPuesto = success;
          window.console.log(this.listaFuncionariosPorPuesto);
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
    doc.save('reportePorPuesto.pdf');
  }

}
