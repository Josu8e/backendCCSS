import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Funcionario } from './funcionario';
import { FuncionariosService } from './funcionarios.service'


@Directive({
  selector: '[ngx-verificarT][formControlName],[verificarT][formControl],[verificarT][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: VerificarNumeroTarjetaDirective, multi: true }],
})
export class VerificarNumeroTarjetaDirective implements Validator {

  Funcionario: Funcionario[];

  constructor(private funcionariosService: FuncionariosService) {
    this.Funcionario = new Array<Funcionario>();
    this.funcionariosService.consultarFuncionarios()
      .subscribe(datosFuncionario => this.Funcionario = datosFuncionario);
  }

  // función personalizada que valida que el valor ingresado
  validate(control: FormControl): { [key: string]: any; } {
    let u: string;
    u = control.value;
    let p: boolean;
    if (u !== null && u !== undefined) {
      this.Funcionario.forEach(fun => {
        if (fun.numero_tarjeta.toString() === u.toString()) {
          p = true;
        }
      });
    }
    // se verifica que el valor ingresado cumpla las restricciones, si es así retorna true si no retorna null 
    return (p === true) ? { 'verificarT': true } : null;
  }



}

