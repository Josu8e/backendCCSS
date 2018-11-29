export class Elegible {
    disponible: boolean;
    cedula: number;
    nombre: string;
    categoria: string;
    dias_puesto: number;
    dias_servicio: number;
    dias_institucion: number;

    constructor(disponible: boolean, categoria: string, cedula: number,
        nombre: string, dias_puesto: number,
        dias_servicio: number, dias_institucion: number) {
        this.disponible = disponible;
        this.cedula = cedula;
        this.nombre = nombre;
        this.categoria = categoria;
        this.dias_puesto = dias_puesto;
        this.dias_servicio = dias_servicio;
        this.dias_institucion = dias_institucion;

    }

    public getDisponible(): boolean {
        return this.disponible;
    }

    public getCategoria(): string {
        return this.categoria;
    }

    public getCedula(): number {
        return this.cedula;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getDiasPuesto(): number {
        return this.dias_puesto;
    }

    public getDiasServicio(): number {
        return this.dias_servicio;
    }

    public getDiasInstitucion(): number {
        return this.dias_institucion;
    }

    public setCategoria(categoria: string) {
        this.categoria = categoria;
    }

    public setDisponible(disponible: boolean) {
        this.disponible = disponible;
    }

    public setCedula(cedula: number) {
        this.cedula = cedula;
    }

    public setNombre(nombre: string) {
        this.nombre = nombre;
    }

    public setDiasPuesto(dias_puesto: number) {
        this.dias_puesto = dias_puesto;
    }

    public setDiasServicio(dias_servicio: number) {
        this.dias_servicio = dias_servicio;
    }

    public setDiasInstitucio(dias_institucion: number) {
        this.dias_institucion = dias_institucion;
    }
}
