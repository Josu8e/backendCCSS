import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {

  transform(funcionarios: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return funcionarios;
    return funcionarios.filter(function (funcionarios) {
      if (adicional === 'Cedula'.toString()) {
        return funcionarios.cedula.toString().includes(buscar);
      }
      else if (adicional === 'Nombre'.toString()) {
        return funcionarios.nombre.toLowerCase().includes(buscar.toLowerCase());
      }
      else if (adicional === 'Apellido 1'.toString()) {
        return funcionarios.apellido1.toLowerCase().includes(buscar.toLowerCase());
      }
      else if (adicional === 'Apellido 2'.toString()) {
        return funcionarios.apellido2.toLowerCase().includes(buscar.toLowerCase());
      }

      //ToDo: see why it does not catches date search.
      else if (adicional === 'Fecha Nacimiento'.toString()) {
        return funcionarios.fecha_nacimiento.toLowerCase().includes(buscar.toLowerCase());
      }
      else if (adicional === 'Fecha Ingreso'.toString()) {
        return funcionarios.fecha_ingreso.toLowerCase().includes(buscar.toLowerCase());
      }

      else if (adicional === 'Numero Tarjeta'.toString()) {
        return funcionarios.numero_tarjeta.toString().includes(buscar);
      }
      else if (adicional === 'Correo'.toString()) {
        return funcionarios.correo.toLowerCase().includes(buscar.toLowerCase());
      }


      else if (adicional === 'Nombre Completo'.toString()) {
        return (funcionarios.nombre + " " + funcionarios.apellido1 + " " + funcionarios.apellido2).toLowerCase().includes(buscar.toLowerCase());
      }


      else {
        return funcionarios;
      }
    })
  }
}
