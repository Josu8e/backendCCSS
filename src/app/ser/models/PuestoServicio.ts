export class PuestoServicio {
    id: number;
    id_servicio: number;
    nombre_servicio: string;
    nombre: string;
    codigo: string;
    promedio_salarial: number;
    descripcion: string;
    constructor(id: number, id_servicio: number, nombre_servicio: string, nombre: string,
        codigo: string, promedio_salarial: number, descripcion: string) {
        this.id = id;
        this.id_servicio = id_servicio;
        this.nombre = nombre;
        this.codigo = codigo;
        this.promedio_salarial = promedio_salarial;
        this.descripcion = descripcion;
        this.nombre_servicio = nombre_servicio
    }
    public getId(): number {
        return this.id;
    }
    public getIdServicio(): number {
        return this.id_servicio;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getPromedioSalarial(): number {
        return this.promedio_salarial;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }
    public setId(id: number) {
        this.id = id;
    }
    public setIdServicio(id_servicio: number) {
        this.id_servicio = id_servicio;
    }
    public setNombre(nombre: string) {
        this.nombre = nombre;
    }
    public setPromedioSalarial(promedio_salarial: number) {
        this.promedio_salarial = promedio_salarial;
    }
    public setDescripcion(descripcion: string) {
        this.descripcion = descripcion;
    }
    public getNombreServicio(): string {
        return this.nombre_servicio;
    }
    public setNombreServicio(nombre_servicio: string) {
        this.nombre_servicio = nombre_servicio;
    }
}
