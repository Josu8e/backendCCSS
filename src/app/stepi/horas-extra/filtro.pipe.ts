import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(solicitudes: any, buscar: any, adicional: string): any {
    if (buscar === undefined ) {
      return solicitudes;
    }
    buscar = buscar.toLowerCase();
    return solicitudes.filter(function(solicitud) {
      if (adicional === 'Servicio'.toString()) { 
        return solicitud.nombre.toLowerCase().includes(buscar.toLowerCase()); 
      }else if (adicional === 'Solicitante'.toString()) { 
        return solicitud.jefe_servicio.toString().toLowerCase().includes(buscar); 
      }else { 
        return solicitud; 
      }
    })
  }

}
