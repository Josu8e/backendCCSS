import { Injectable } from '@angular/core';
import { Usuario, Funcionario } from './usuario';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'
@Injectable()
export class UsuariosService {
  api: string = `http://${environment.server}/api/usuarios/`;
  constructor(
    private http: HttpClient) { }

  consultarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.api.concat('obtener'), { responseType: 'json' });
  }
  consultarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.api.concat('funcionarios'), { responseType: 'json' });
  }

  insertarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.api.concat('insertar'), usuario, { responseType: 'json' })
  }
  modificarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.api.concat('modificar'), usuario, { responseType: 'json' })
  }
  eliminarUsuario(id: number): Observable<{}> {
    return this.http.delete(this.api.concat('eliminar/' + id), { responseType: 'text' });
  }
}
