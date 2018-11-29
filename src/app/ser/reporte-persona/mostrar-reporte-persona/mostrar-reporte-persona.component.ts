import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {configToasterManager} from '../../../@core/toast/config';
import {ToasterManagerService} from '../../../@core/toast/toaster-manager.service';
import {ReportePersonaService} from '../reporte-persona.service';
import {Funcionario} from '../../../auth/funcionario';
import {ReporteCompletoComponent} from '../reporte-completo/reporte-completo.component';
import {Router} from '@angular/router';


@Component({
  selector: 'ngx-mostrar-reporte-persona',
  templateUrl: './mostrar-reporte-persona.component.html',
  styleUrls: ['./mostrar-reporte-persona.component.scss'],
})
export class MostrarReportePersonaComponent implements OnInit {
  @Output() public delete = new EventEmitter<Funcionario>();
  public funcionarios: Funcionario[];
  opciones = ['Cédula', 'Nombre'];
  // Opcion por default.
  opcionSeleccionada: any = 'Nombre';
  constructor(private modalService: NgbModal, public toasterManagerService: ToasterManagerService,
              public funcionarioService: ReportePersonaService,  private router: Router) { }
  config= configToasterManager;
  ngOnInit() {
    this.funcionariosCargarLista();
  }

  funcionariosCargarLista(): void {
    this.funcionarioService.getFuncionarios()
      .subscribe(
        success => {
          this.funcionarios = success;
        },
        err => {
          window.console.log('error')  // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
      );
  }

  /*
Descripcion: Función que obtiene la información completa de una persona seleccionada en la vista de la tabla con todos
los funcionarios que laboran en la institución
Recibe:
Envia: Abre el modal con la vista completa del reporte por persona
*/
abrirReporteCompleto(funcionario: Funcionario) {
    const modalRef = this.modalService.open(ReporteCompletoComponent);
    modalRef.componentInstance.fun = funcionario;
    modalRef.componentInstance.Nombramiento = funcionario;
    /*modalRef.result.then((result) =>
      this.puestosCargarLista();
    });*/
  }

  gotoDetail(hero: Funcionario): void {
    const link = ['/detail', hero];
    this.router.navigate(link);
  }

}
