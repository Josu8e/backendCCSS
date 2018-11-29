
export class HorasExtra {
    cedula: string;
    nombre: string;
    Tarjeta: string;
    horasExtra: number;
}

export class solicitudActual {
    horas: number;
    id_funcionario_nombramiento: number;
    id_puesto: number;
}

export class Solicitud {
    horas: number;
    // Cedula
    id_persona_ausente: string;
    id_Puesto: number;
    motivo: string;
    justificacion: string;
    // Detalles de incapacidad
    doctor: string;
    numeroBoleta: number;
    Id_sustituto: string; // Cedula
    fecha: string;
}

export class Funcionarios {
    cedula: string;
    nombre: string;
    tarjeta: number;
    id_funcionario_nombramiento: number;
    id_puesto: number;
    horas: number;
}
