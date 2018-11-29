import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {

  transform(servicios: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return servicios;
    else {
      return servicios.filter(function (p) {
        if (adicional === 'Codigo Servicio'.toString()) return p.codigo.toString().includes(buscar);
        else if (adicional === 'Nombre Servicio'.toString()) return p.nombre.toLowerCase().includes(buscar.toLowerCase());
        else return p;
      });
    }
  }
}
