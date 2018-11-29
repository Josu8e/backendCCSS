import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Funcionario, Usuario } from './usuario';
import {UsuariosService} from './usuarios.service'
@Directive({
  selector: '[ngx-verificarU][formControlName],[verificarU][formControl],[verificarU][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: VerificarUsuarioDirective, multi: true}],
})
export class VerificarUsuarioDirective implements Validator {
  Usuarios: Usuario[];
  constructor(private usuariosService: UsuariosService) {
    this.Usuarios = new Array<Usuario>();
    this.usuariosService.consultarUsuarios()
    .subscribe(datosUsuarios => this.Usuarios = datosUsuarios);
  }
  // función personalizada que valida que el valor ingresado sea menor a un valor específico
  validate(control: FormControl): { [key: string]: any; } {
    let u: string ;
    u = control.value;
    let p: boolean;
    if (u !== null && u !== undefined) {
    u = u.replace(' ', '')
    this.Usuarios.forEach(usuario => {
      if (usuario.nombre_usuario === u) {
        p = true;
      }
    });
  }
    // se verifica que el valor ingresado cumpla las restricciones, si es así retorna true si no retorna null
    return ( p === true ) ? {'verificarU': true} : null;
  }

}
