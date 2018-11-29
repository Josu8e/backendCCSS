import { Funcionario } from './funcionario';

export class Auth {
  private _id: number;
  private _funcionario: Funcionario;
  private _acceso: string;
  private _roles: {};

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get funcionario(): Funcionario {
    return this._funcionario;
  }

  set funcionario(value: Funcionario) {
    this._funcionario = value;
  }

  get acceso(): string {
    return this._acceso;
  }

  set acceso(value: string) {
    this._acceso = value;
  }

  set roles(value: any){
    this._roles = value;
  }

  get roles(){
    return this._roles;
  }
}
