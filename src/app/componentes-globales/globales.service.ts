/**
 *  Servicio para almacenar las variables globales
 */

export class GlobalesService {

  public variablesGlobales: any = {
    sistemaActual: '',          // SER o STEPI
    accesoDual: false,          // true si el usuario tiene acceso a los 2 sistemas
    roles: {                    // Todos los roles disponibles tanto para STEPI como para SER
      'JEFE_SERVICIO': '1',
      'SECRETARIA': '2',
      'PRESUPUESTO': '3',
      'ADMINISTRATIVO': '4',
      'SUPERVISOR': '5',
      'RECURSOS_HUMANOS': '6'
    }
  }

  constructor() { }

}
