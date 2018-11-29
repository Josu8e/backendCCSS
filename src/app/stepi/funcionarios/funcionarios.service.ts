import { Injectable } from '@angular/core';
import { Funcionario } from './funcionario';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'
@Injectable()
export class FuncionariosService {

  private api: string = `http://${environment.server}/api/funcionarios/`;

  constructor(private http: HttpClient) {

  }

  //Obtiene los datos de los funcionarios.
  consultarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.api.concat('consultar'), { responseType: 'json' });
  }

  //Inserta un nuevo funcionario.
  insertarFuncionarios(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.api.concat('insertar'), funcionario);
  }

  //Borra un funcionario existente.
  borrarFuncionario($cedula: string): Observable<{}> {
    return this.http.delete(this.api.concat('borrar/' + $cedula))
  }

  //Modificar un funcionario existente.
  modificarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    console.log(funcionario.telefono);
    return this.http.put<Funcionario>(this.api.concat('editar'), funcionario, { responseType: 'json' })
  }

}
