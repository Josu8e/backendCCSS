import { GlobalesService } from './../../componentes-globales/globales.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'elegir-sistema',
  templateUrl: './elegir-sistema.component.html',
  styleUrls: ['./elegir-sistema.component.scss']
})
export class ElegirSistemaComponent implements OnInit {

  constructor(private router:Router, private globals:GlobalesService) { }

  cargarSTEPI(){
    this.globals.variablesGlobales['sistemaActual'] = 'STEPI';
    this.router.navigate(['stepi']);
  }

  cargarSER(){
    this.globals.variablesGlobales['sistemaActual'] = 'SER';
    this.router.navigate(['ser']);
  }

  ngOnInit() {
  }

}
