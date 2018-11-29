import { AbstractControl, ValidatorFn } from '@angular/forms';

export class VerificarNombreSustituto {
    static verificarNombre(listaNombres: Array<string>): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let estado = null;

            let nombre_input: string;
            nombre_input = control.value;

            if (!listaNombres.includes(nombre_input)) {
                estado = true;
            }
            return (estado === true) ? { 'verificarNombre': true } : null;
        };
    };
}
