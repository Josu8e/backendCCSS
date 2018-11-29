import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {

  transform(elegibles: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return elegibles;
    else {
      return elegibles.filter(function (p) {
        if (adicional === 'Cedula'.toString()) return p.cedula.toString().includes(buscar);
        else if (adicional === 'Nombre'.toString()) return p.nombre.toLowerCase().includes(buscar.toLowerCase());
        else if (adicional === 'Tipo de Elegible') return p.categoria.toLowerCase().includes(buscar.toLowerCase());
        else return p;
      });
    }
  }
}
