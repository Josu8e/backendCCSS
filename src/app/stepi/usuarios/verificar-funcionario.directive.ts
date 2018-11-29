import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Funcionario, Usuario } from './usuario';
import {UsuariosService} from './usuarios.service'
@Directive({
  selector: '[verificarF][formControlName],[verificarF][formControl],[verificarF][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: VerificarFuncionarioDirective, multi: true}],
})
export class VerificarFuncionarioDirective implements Validator {
  Usuarios: Usuario[];
  constructor(private usuariosService: UsuariosService) {
    this.Usuarios = new Array<Usuario>();
    this.usuariosService.consultarUsuarios()
    .subscribe(datosUsuarios => this.Usuarios = datosUsuarios);
  }
  // función personalizada que valida que el valor ingresado sea menor a un valor específico
  validate(control: FormControl): { [key: string]: any; } {
    let f: Funcionario = new Funcionario();
    f = control.value;
    let p: boolean;
    if (f !== null) {
    this.Usuarios.forEach(usuario => {
      if (usuario.cedula === f.cedula) {
        p = true;
      }
    });
  }
    // se verifica que el valor ingresado cumpla las restricciones, si es así retorna true si no retorna null
    return ( p === true ) ? {'verificarF': true} : null;
  }

}
