import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from '../funcionario'
import { FuncionariosService } from '../funcionarios.service';

import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

@Component({
  selector: 'insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.scss']
})
export class InsertarComponent implements OnInit {


  @Input() funcionario: Funcionario;
  @Input() datosFuncionario;
  @Input() modificar;

  private Funcionarios;
  private titulo;
  private solicitudActual;
  private y;

  constructor(public activeModal: NgbActiveModal, private FuncionariosService: FuncionariosService,
    private toasterManagerService: ToasterManagerService) { }

  config = configToasterManager;
  desabilitado: boolean;
  desabilitado2: boolean;
  telefonosBorrados = [];

  ngOnInit() {
    this.solicitudActual = new Funcionario();
    this.FuncionariosService.consultarFuncionarios()
      .subscribe(res => this.Funcionarios = res);
    //Si se inicia para insertar    
    if (this.funcionario == null) {
      this.solicitudActual = new Funcionario();
      this.solicitudActual.telefono = [{ numero: '', id: '' }];
      this.titulo = 'Insertar';
    }
    //Si se inicia para modificar o para ver los datos:
    else {

      //Ver datos solamente
      if (!(this.modificar)) {
        this.titulo = 'Ver datos';
        this.desabilitado = true;
        this.desabilitado2 = true;
        this.solicitudActual = JSON.parse(JSON.stringify(this.funcionario));
      }

      //Modificar
      else {
        this.titulo = 'Modificar';
        this.desabilitado = true;
        //Object.assign(this.solicitudActual, this.funcionario);
        //this.solicitudActual.telefono = Object.assign([], this.funcionario.telefono);
        this.solicitudActual = JSON.parse(JSON.stringify(this.funcionario));
      }
    }
  }

  guardarDatos() {
    //Si se inicia para insertar    
    if (this.funcionario == null) {
      this.FuncionariosService.insertarFuncionarios(this.solicitudActual).subscribe(
        funcionario => {
          this.datosFuncionario.push(funcionario)
          this.toasterManagerService.makeToast('success', 'Agregar', 'Funcionario agregado');
        },
        error => {
          this.toasterManagerService.makeToast('error', '¡No se completo el agregar! ',
            'No se ha agregado el funcionario debido a un error con el servidor.');
        },
      );

    }
    //Si se inicia para modificar    
    else {
      for (let telefono of this.telefonosBorrados) {

        if (telefono['id'] != "") {
          this.solicitudActual.telefono.push({ numero: "-1", id: telefono['id'] })
        }

      }


      this.FuncionariosService.modificarFuncionario(this.solicitudActual).subscribe(
        funcionario => {
          this.funcionario.nombre = funcionario.nombre;
          this.funcionario.apellido1 = funcionario.apellido1;
          this.funcionario.apellido2 = funcionario.apellido2;
          this.funcionario.fecha_nacimiento = funcionario.fecha_nacimiento;
          this.funcionario.fecha_ingreso = funcionario.fecha_ingreso;
          this.funcionario.numero_tarjeta = funcionario.numero_tarjeta;
          this.funcionario.correo = funcionario.correo;
          this.funcionario.telefono = funcionario.telefono;
          this.toasterManagerService.makeToast('success', 'Modificar', 'Funcionario modificado');
        },
        error => {
          this.toasterManagerService.makeToast('error', '¡No se completo el modificar! ',
            'No se ha modificado el funcionario debido a un error con el servidor.');
        },
      );

    }
    this.activeModal.close();
  }

  add() {
    this.solicitudActual.telefono.push({ numero: '', id: '' });
  }

  delete() {
    this.telefonosBorrados.push(this.solicitudActual.telefono.pop());
  }
}
