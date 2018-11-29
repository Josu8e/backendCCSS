import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[customMin][formControlName],[customMin][formControl],[customMin][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomMinDirective, multi: true}],
})
export class CustomMinDirective implements Validator {

  @Input() min: number;

  // función personalizada que valida que el valor ingresado sea menor a un valor específico
  validate(control: FormControl): { [key: string]: any; } {
    // se recupera el valor ingresado por el usuario
    const valor = control.value;  
    // se verifica que el valor ingresado cumpla las restricciones, si es así retorna true si no retorna null
    return ( valor < this.min ) ? {'customMin': true} : null;
  }

}
