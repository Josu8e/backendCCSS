import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReporteServiciosService } from '../reporte-servicios.service';
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';

@Component({
  selector: 'ngx-seleccionar-servicio',
  templateUrl: './seleccionar-servicio.component.html',
  styleUrls: ['./seleccionar-servicio.component.scss'],
})
export class SeleccionarServicioComponent implements OnInit {

  @Output() public delete = new EventEmitter<string>(); // string
  public nombreYCodigoDeServiciosLista = [];

  opciones = ['Código', 'Nombre'];
  // Opcion por default.
  opcionSeleccionada: any = 'Nombre';


  constructor(public toasterManagerService: ToasterManagerService,
    public reporteServiciosServ: ReporteServiciosService) { }

  config = configToasterManager;

  ngOnInit() {
    this.nombreYCodigoDeServicios();
  }

  nombreYCodigoDeServicios(): void {
    this.reporteServiciosServ.obtenerNombreYCodigoServicios()
      .subscribe(
        success => {
          this.nombreYCodigoDeServiciosLista = success;
          window.console.log(this.nombreYCodigoDeServiciosLista);
        },
        err => {
          window.console.log('error')  // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
    );
  }

}
