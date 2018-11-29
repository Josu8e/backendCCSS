export class Usuario {
  id: number;
  cedula: string;
  nombre: string;
  nombre_usuario: string;
  STEPI: string; //Por aca hay que mandar el string con los numeros de los roles
  SER: number;
}
export class Funcionario {
  cedula: string;
  nombre: string;
}

export class Acceso {
  nombre_acceso: string;
  acceso: number;
  constructor(nombre: string, acceso: number) {
    this.nombre_acceso = nombre;
    this.acceso = acceso;
  }
  
}

export class AccesoStepiA {
  nombre_acceso: string;
  acceso: string;
  constructor(nombre: string, acceso: string) {
    this.nombre_acceso = nombre;
    this.acceso = acceso;
  }
  
}