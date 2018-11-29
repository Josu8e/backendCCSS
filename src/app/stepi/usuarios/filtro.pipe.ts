import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {
  private
  transform(usuarios: any, buscar: any, adicional: string): any {
    if ( buscar === undefined) return usuarios;
    return usuarios.filter(function(usuario){
      if (adicional === 'Usuario'.toString()) {
        return usuario.nombre_usuario.toLowerCase().includes(buscar.toLowerCase());
      }else if (adicional === 'Cedula'.toString()) {
        return usuario.cedula.toLowerCase().includes(buscar.toLowerCase());
      }else if (adicional === 'Nombre'.toString()) {
        return usuario.nombre.toLowerCase().includes(buscar.toLowerCase());
      }else {
        return usuarios;
      }
        })
  }

}
