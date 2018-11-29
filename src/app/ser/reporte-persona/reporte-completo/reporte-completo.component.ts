import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Funcionario} from '../../../auth/funcionario';
import {ActivatedRoute} from '@angular/router';
import {ReportePersonaService} from '../reporte-persona.service';
import {ToasterManagerService} from '../../../@core/toast/toaster-manager.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'ngx-reporte-completo',
  templateUrl: './reporte-completo.component.html',
  styleUrls: ['./reporte-completo.component.scss'],
})
export class ReporteCompletoComponent implements OnInit {
  private cedulaSeleccionada;
  @Input() fun: Funcionario;
  public informacion: Funcionario;
  public puestosFuncionario: any[]= [];
  public informacionPuestos: any[] = [];
  listaTipos = ['Interino', 'Propiedad'];
  @ViewChild('page') page: ElementRef;
  constructor(private _route: ActivatedRoute, public funcionarioService: ReportePersonaService,
              public toasterManagerService: ToasterManagerService) { }

  ngOnInit() {
    this.cedulaSeleccionada = +this._route.snapshot.paramMap.get('cedula');
    this.prueba();
    this.puestosPorFuncionario();
  }

  prueba(): void {
    this.funcionarioService.getFuncionarioSeleccionado(this.cedulaSeleccionada).subscribe(
      (info) => {
        this.informacion = info;
      },
      (error) =>  this.toasterManagerService.makeToast('error', 'Error de servidor',
        'No se pudieron recuperar los datos necesarios para la solicitud.'),
    );
  }


  lista(): void {
    for (const item of this.puestosFuncionario){
      this.llamarInfo(item.id_puesto)
    }
  }

  puestosPorFuncionario(): void {
    this.funcionarioService.getPuestosPorFuncionario(this.cedulaSeleccionada).subscribe(
      (info) => {
        this.puestosFuncionario = info;
        this.lista();
      },
      (error) =>  this.toasterManagerService.makeToast('error', 'Error de servidor',
        'No se pudieron recuperar los datos necesarios para la solicitud.'),
    );
  }

  /*
    Descripcion: Funcion que busca la información en la base de datos de un funcionario especifico
    Recibe:
    Envia: Los datos completos del funcionario que ha sido buscado
  */

  llamarInfo(idPuesto: number): void {
    this.funcionarioService.getInfo(this.cedulaSeleccionada, idPuesto).subscribe(
      (info) => {
        this.informacionPuestos.push(info);
        window.console.log('Si entra');
      },
      (error) =>  this.toasterManagerService.makeToast('error', 'Error de servidor',
        'No se pudieron recuperar los datos necesarios para la solicitud.'),
    );
  }
    /*
    Descripcion:Funcion que obtiene la vista y la conviete en PDF
    Recibe:
    Envia: Un archivo pdf con la información del reporte
    */
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
      doc.save('Reporte.pdf');
    }
}
