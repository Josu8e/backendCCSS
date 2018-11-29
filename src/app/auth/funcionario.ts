export class Funcionario {
  private _cedula: number;
  private _nombre: string;
  private _apellido1: string;
  private _apellido2:  string;
  private _fecha_nacimiento: Date;
  private _fecha_ingreso: Date;
  private _numero_tarjeta: number;
  private _correo: string;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(cedula: number, nombre: string, apellido1: string, apellido2: string,
              fecha_nacimiento: Date, fecha_ingreso: Date, numero_tarjeta: number, correo: string,
              created_at: Date, updated_at: Date) {
    this._cedula = cedula;
    this._nombre = nombre;
    this._apellido1 = apellido1;
    this._apellido2 = apellido2;
    this._fecha_nacimiento = fecha_nacimiento;
    this._fecha_ingreso = fecha_ingreso;
    this._numero_tarjeta = numero_tarjeta;
    this._correo = correo;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }

  get cedula(): number {
    return this._cedula;
  }

  set cedula(value: number) {
    this._cedula = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get apellido1(): string {
    return this._apellido1;
  }

  set apellido1(value: string) {
    this._apellido1 = value;
  }

  get apellido2(): string {
    return this._apellido2;
  }

  set apellido2(value: string) {
    this._apellido2 = value;
  }

  get fecha_nacimiento(): Date {
    return this._fecha_nacimiento;
  }

  set fecha_nacimiento(value: Date) {
    this._fecha_nacimiento = value;
  }

  get fecha_ingreso(): Date {
    return this._fecha_ingreso;
  }

  set fecha_ingreso(value: Date) {
    this._fecha_ingreso = value;
  }

  get numero_tarjeta(): number {
    return this._numero_tarjeta;
  }

  set numero_tarjeta(value: number) {
    this._numero_tarjeta = value;
  }

  get correo(): string {
    return this._correo;
  }

  set correo(value: string) {
    this._correo = value;
  }

  get created_at(): Date {
    return this._created_at;
  }

  set created_at(value: Date) {
    this._created_at = value;
  }

  get updated_at(): Date {
    return this._updated_at;
  }

  set updated_at(value: Date) {
    this._updated_at = value;
  }

}
