import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(nombramientos: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return nombramientos;
    else {
      return nombramientos.filter(function (p) {
        if (adicional === 'Cedula'.toString()) return p.cedula.toString().includes(buscar);
        else if (adicional === 'Código'.toString()) return p.id.toLowerCase().includes(buscar.toLowerCase());
        else return p;
      });
    }
  }
}



