export class User {
  id: number;
  cedula: string;
  nombre_usuario: string;
  nivel_acceso: number;
  created_at: Date;
  updated_at: Date;
  password: string;
  sistema: string;


  constructor(id: number, cedula: string, nombre_usuario: string, nivel_acceso: number,
    created_at: Date, updated_at: Date, password: string) {
    this.cedula = cedula;
    this.password = password;
    this.nombre_usuario = nombre_usuario;
    this.nivel_acceso = nivel_acceso;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.id = id;

  }

}



