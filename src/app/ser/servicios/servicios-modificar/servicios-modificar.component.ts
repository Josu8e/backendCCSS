import {Component, Input, OnInit} from '@angular/core';
import {ServiciosService} from '../servicios.service';
import {Servicio} from '../../models/Servicio';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToasterManagerService} from '../../../@core/toast/toaster-manager.service';
import {configToasterManager} from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';



@Component({
  selector: 'ngx-servicios-modificar',
  templateUrl: './servicios-modificar.component.html',
  styleUrls: ['./servicios-modificar.component.scss'],
})
export class ServiciosModificarComponent implements OnInit {
  public myItems: Servicio[] = new Array();
  public servicios: Servicio;
  modificarForm: FormGroup;
  config= configToasterManager;
  @Input() idServicio: number;
  constructor(formBuilder: FormBuilder, public serviciosService: ServiciosService, private activeModal: NgbActiveModal,
  private toasterManagerService: ToasterManagerService ) {
    this.modificarForm = formBuilder.group({
      'nombre_input': [''],
      'codigo_input': [''],
      'descripcion_input': [''],
    });
  }

  ngOnInit() {
    this.myItems.push(this.serviciosService.selectServicios);
  }
  // se activa con el boton modificar, se crea el objeto con las modificaciones
  onSubmit(form: any) {
    window.console.log('probando modificar');
    const id = this.serviciosService.selectServicios.id;
    const nombre = form.nombre_input;
    const codigo = form.codigo_input;
    const descripcion = form.descripcion_input;

    window.console.log('id:' , id);
    window.console.log('nombre: ' , nombre);
    window.console.log('codigo: ', codigo);
    window.console.log('descripcion: ' , descripcion);
    // const id = 1017;

    const servicio = new Servicio(id, nombre, codigo, descripcion);
    this.modificarServicio (servicio);

  }
  /*
  Descripcion:se modifica el servicio, llamando a la funcion del service que se ocnecta con el back-end
  Recibe: el objeto servicio con todos los datos
  Envia:el exito o el fallo de la modificacion del servicio
  */
  modificarServicio(servicio: Servicio) {
    this.serviciosService.updateServicio(servicio)
      .subscribe(
        success => {
          this.servicios = success;
          window.console.log ('resultado: ' + this.servicios);
          this.activeModal.close();
          // window.location.reload();
          this.toasterManagerService.makeToast('success', 'Éxito', 'Se ha modificado correctamente el servicio.');

        },
        err => {
          window.console.log ('error en modificar')
          this.toasterManagerService.makeToast('error', 'Fallo', 'No se ha modificado correctamente el servicio.');

          // dirigir a view de mensaje de error (FALTA)
          // this._router.navigate(['/error']);
        },
      );
  }
  /*
  Descripcion:funcion que cierra el modal
  Recibe: no recibe ningun parametro
  Envia:el cierre del modal
  */
  cancelar() {
    this.activeModal.close();
  }

}
