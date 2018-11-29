import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Servicio} from '../../models/Servicio';
import {ServiciosService} from '../servicios.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToasterManagerService} from '../../../@core/toast/toaster-manager.service';
import {configToasterManager} from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';


@Component({
  selector: 'ngx-servicios-crear',
  templateUrl: './servicios-crear.component.html',
  styleUrls: ['./servicios-crear.component.scss'],
})
export class ServiciosCrearComponent implements OnInit {
  public servicios: Servicio;
  crearForm: FormGroup;
  config= configToasterManager;

  constructor(formBuilder: FormBuilder, private serviciosService: ServiciosService, private activeModal: NgbActiveModal,
              private toasterManagerService: ToasterManagerService ) {
    this.crearForm = formBuilder.group({
      'codigo_input': ['', [Validators.required]],
      'nombre_input': ['', [Validators.required, Validators.maxLength(70)]],
      'descripcion_input': ['', [Validators.required, Validators.maxLength(150)]],
    });
  }
  // funcion que se activa con el boton crear, crea el nuevo objeto servicio
  onSubmit(form: any) {
    const nombre = form.nombre_input;
    const codigo = form.codigo_input;
    const descripcion = form.descripcion_input;

    window.console.log('nombre: ' , nombre);
    window.console.log('codigo: ', codigo);
    window.console.log('descripcion: ' , descripcion);

    const servicio = new Servicio(null, nombre, codigo, descripcion);

    this.serviciosCrear(servicio);
  }
  /*
  Descripcion:funcion que permite crear el servicio
  Recibe: el objeto servicio que trae consigo todos los datos necesarios
  Envia:el exito o fallo de la creacion del servicio
  */
  serviciosCrear(servicio: Servicio) {
    this.serviciosService.servicioCrear(servicio)
      .subscribe(
        success => {
          this.servicios = success;
          window.console.log ('resultado: ' + this.servicios);
          this.activeModal.close();
          this.toasterManagerService.makeToast('success', 'Éxito', 'Se ha creado correctamente el servicio.');
        },
        err => {
          window.console.log ('error en crear')
          this.toasterManagerService.makeToast('error', 'Fallo', 'No se ha creado correctamente el servicio.');

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

  ngOnInit() {
  }
}
