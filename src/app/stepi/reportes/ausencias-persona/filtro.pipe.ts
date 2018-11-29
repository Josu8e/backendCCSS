import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroReportes',
    pure: false,
})
export class FiltroPipeReportes implements PipeTransform {

    transform(funcionarios: any, buscar: any, adicional: string): any {
        if (buscar === undefined) return funcionarios;
        return funcionarios.filter(function (funcionarios) {
            if (adicional === 'Cedula'.toString()) {
                return funcionarios.cedula.toString().includes(buscar);
            }
            else if (adicional === 'Nombre'.toString()) {
                return funcionarios.nombre_funcionario.toLowerCase().includes(buscar.toLowerCase());
            }
            else if (adicional === 'Primer apellido'.toString()) {
                return funcionarios.apellido1_funcionario.toLowerCase().includes(buscar.toLowerCase());
            }
            else if (adicional === 'Segundo apellido'.toString()) {
                return funcionarios.apellido2_funcionario.toLowerCase().includes(buscar.toLowerCase());
            }

            else if (adicional === 'fecha'.toString()) {
                return funcionarios.fecha.toLowerCase().includes(buscar.toLowerCase());
            }

            else if (adicional === 'Puesto'.toString()) {
                return funcionarios.puesto.toLowerCase().includes(buscar.toLowerCase());
            }

            else if (adicional === 'Motivo'.toString()) {
                return funcionarios.motivo.toLowerCase().includes(buscar.toLowerCase());
            }

            else {
                return funcionarios;
            }
        })
    }
}
