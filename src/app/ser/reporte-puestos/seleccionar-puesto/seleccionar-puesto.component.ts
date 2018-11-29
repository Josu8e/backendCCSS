
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ReportePuestosService} from '../reporte-puestos.service';
import {configToasterManager} from '../../../@core/toast/config';
import {ToasterManagerService} from '../../../@core/toast/toaster-manager.service';

@Component({
  selector: 'ngx-seleccionar-puesto',
  templateUrl: './seleccionar-puesto.component.html',
  styleUrls: ['./seleccionar-puesto.component.scss'],
})
export class SeleccionarPuestoComponent implements OnInit {

  @Output() public delete = new EventEmitter<string>(); // string
  public nombreYCodigoDePuestosLista = [];
  opciones = ['Código', 'Nombre'];
  // Opcion por default.
  opcionSeleccionada: any = 'Nombre';

  // constructor(public reportePuestosServ: ReportePuestosService) {  }

  constructor(public toasterManagerService: ToasterManagerService,
              public reportePuestosServ: ReportePuestosService) { }

  config= configToasterManager;

  ngOnInit() {
    this.nombreYCodigoDePuestos();
  }

  nombreYCodigoDePuestos(): void {
    this.reportePuestosServ.obtenerNombreYCodigoPuestos()
      .subscribe(
        success => {
          this.nombreYCodigoDePuestosLista = success;
          window.console.log(this.nombreYCodigoDePuestosLista);
        },
        err => {
          window.console.log('error')  // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
      );
  }

}
