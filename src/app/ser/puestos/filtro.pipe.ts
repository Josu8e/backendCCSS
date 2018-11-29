import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {

  transform(puestos: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return puestos;
    else {
      return puestos.filter(function (p) {
        if (adicional === 'Codigo Puesto'.toString()) return p.codigo.toString().includes(buscar);
        else if (adicional === 'Nombre Puesto'.toString()) return p.nombre.toLowerCase().includes(buscar.toLowerCase());
        else if (adicional === 'Nombre Servicio'.toString()) return p.nombre_servicio.toLowerCase().includes(buscar.toLowerCase());
        else return p;
      });
    }
  }
}
