import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Puesto } from '../../models/Puesto';

export class VerificarCodigoPuesto {
    static verificarCodigo(puestos: Array<Puesto>): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let estado = null;

            let codigoPuestoFormControl: string;
            codigoPuestoFormControl = control.value;

            if (codigoPuestoFormControl !== null && codigoPuestoFormControl !== undefined) {
                puestos.forEach(puesto => {
                    if (puesto.codigo === codigoPuestoFormControl) {
                        estado = true;
                    }
                });
            }
            return (estado === true) ? { 'verificarCodigo': true  } : null;
        };
    };
}
