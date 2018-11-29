import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[customMax][formControlName],[customMax][formControl],[customMax][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomMaxDirective, multi: true}]
})
export class CustomMaxDirective implements Validator {
  
  @Input() customMax: number;
  
  // función personalizada que valida que el valor ingresado sea menor a un valor específico
  validate(control: FormControl): {[key: string]: any} {
    // se recupera el valor ingresado por el usuario
    const valor = control.value;
    // se verifica que el valor ingresado cumpla las restricciones, si es así retorna true si no retorna null
    return ( valor > this.customMax)? {"customMax": true} : null;
  }
} 

