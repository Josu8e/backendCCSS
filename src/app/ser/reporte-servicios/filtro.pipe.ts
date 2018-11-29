import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {

  transform(puestos: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return puestos;
    else {
      return puestos.filter(function (p) {
        if (adicional === 'Código'.toString()) return p.codigo.toString().includes(buscar);
        else if (adicional === 'Nombre'.toString()) return p.nombre.toLowerCase().includes(buscar.toLowerCase());
        else return p;
      });
    }
  }

}
