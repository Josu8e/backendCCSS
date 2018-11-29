import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(nombramientos: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return nombramientos;
    else {
      return nombramientos.filter(function (p) {
        if (adicional === 'Cédula'.toString()) return p.cedula.toString().includes(buscar);
        else if (adicional === 'Nombre'.toString()) return p.nombre.toLowerCase().includes(buscar.toLowerCase());
        else return p;
      });
    }
  }
}
