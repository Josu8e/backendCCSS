import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_USUARIO: NbMenuItem[] = [ // JEFE DE SERVICIO CONTRASEÑA Y USUARIO 1
  {
    title: 'Inicio',
    icon: 'fa fa-home',
    link: '/ser/dashboard',
    home: true,
  },
  {
    title: 'Elegibles',
    icon: 'fas fa-list-ol',
    children: [
      {
        title: 'Mostrar',
        link: '/ser/elegibles/lista-elegibles',
      },
    ],
  },
  {
    title: 'Nombramientos',
    icon: 'fa fa-list-alt',
    children: [
      {
        title: 'Mostrar',
        link: '/ser/nombramiento/mostrar',
      },
    ],
  },
];
export const MENU_ITEMS_ADMINISTRADOR_SISTEMA: NbMenuItem[] = [ // CONTRASEÑA Y USUARIO 2
  {
    title: 'Inicio',
    icon: 'fa fa-home',
    link: '/ser/dashboard',
    home: true,
  },
  {
    title: 'Servicios',
    icon: 'fa fa-building',
    children: [
      {
        title: 'Mostrar',
        link: '/ser/servicios/mostrar',
      },
    ],
  },
  {
    title: 'Puestos',
    icon: 'fa fa-user-md',
    children: [
      {
        title: 'Mostrar',
        link: '/ser/puestos/lista-puestos',
      },
    ],
  }, /*
  {
    title: 'Nombramientos',
    icon: 'fa fa-list-alt',
    children: [
      {
        title: 'Mostrar',
        link: '/ser/nombramiento/mostrar',
      },
    ],
  },*/ /*
  {
    title: 'Reportes',
    icon: 'far fa-file-alt',
    children: [
      {
        title: 'Por persona',
        link: '/ser/reportePersona/mostrarReportePersona',
      },
      {
        title: 'Por puesto',
        link: '/ser/reportePuestos/seleccionarPuesto',
      },
      {
        title: 'Por servicio',
        link: '/ser/reporteServicios/seleccionarServicio',
      },
    ],
  },*/
];

export const MENU_ITEMS_RRHH: NbMenuItem[] = [  // CONTRASEÑA Y USUARIO 6
  {
    title: 'Inicio',
    icon: 'fa fa-home',
    link: '/ser/dashboard',
    home: true,
  },
  {
    title: 'Elegibles',
    icon: 'fas fa-list-ol',
    children: [
      {
        title: 'Mostrar',
        link: '/ser/elegibles/lista-elegibles',
      },
    ],
  },
  {
    title: 'Servicios',
    icon: 'fa fa-building',
    children: [
      {
        title: 'Mostrar',
        link: '/ser/servicios/mostrar',
      },
    ],
  },
  {
    title: 'Puestos',
    icon: 'fa fa-user-md',
    children: [
      {
        title: 'Mostrar',
        link: '/ser/puestos/lista-puestos',
      },
    ],
  },
  {
    title: 'Nombramientos',
    icon: 'fa fa-list-alt',
    children: [
      {
        title: 'Mostrar',
        link: '/ser/nombramiento/mostrar',
      },
    ],
  },
  {
    title: 'Reportes',
    icon: 'far fa-file-alt',
    children: [
      {
        title: 'Por persona',
        link: '/ser/reportePersona/mostrarReportePersona',
      },
      {
        title: 'Por puesto',
        link: '/ser/reportePuestos/seleccionarPuesto',
      },
      {
        title: 'Por servicio',
        link: '/ser/reporteServicios/seleccionarServicio',
      },
    ],
  },
];
