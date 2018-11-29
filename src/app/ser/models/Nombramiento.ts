export class Nombramiento {
    id: string | number;
    id_puesto: string | number;
    cedula: string | number;
    fecha_inicio: string;
    fecha_fin: string;
    numero_dias: number;
    tiempo: string;
    tipo: string;
    sustituye: string;
    motivo: string;
    estado: boolean;

    constructor(id: string | number, id_puesto: string | number, cedula: string | number, fecha_inicio: string,
        fecha_fin: string, numero_dias: number, tiempo: string, tipo: string, sustituye: string,
        motivo: string, estado: boolean) {
        this.id = id;
        this.id_puesto = id_puesto;
        this.cedula = cedula;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.numero_dias = numero_dias;
        this.tiempo = tiempo;
        this.tipo = tipo;
        this.sustituye = sustituye;
        this.motivo = motivo;
        this.estado = estado;
    }
}
