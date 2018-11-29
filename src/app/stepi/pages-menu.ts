import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_USUARIO: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'fa fa-home',
    link: '/stepi/dashboard',
    home: true,
  },
  {
    title: 'Horas Extra',
    icon: 'far fa-clock',
    children: [
      {
        title: 'Solicitar',
        link: '/stepi/horas-extra/solicitud/realizar',
      },
      {
        title: 'Correcciones',
        link: '/stepi/horas-extra/solicitud/correcciones',
      },
    ],
  },
  {
    title: 'Horas Adicionales',
    icon: 'fas fa-clock',
    children: [
      {
        title: 'Solicitar',
        link: '/stepi/horas-extra/adicionales/realizar',
      },
      {
        title: 'Correcciones',
        link: '/stepi/horas-extra/adicionales/correcciones',
      },
    ],
  },
  {
    title: 'Conteo',
    icon: 'fas fa-clipboard-list',
    children: [
      {
        title: 'Realizar',
        link: '/stepi/conteo',
      },
    ],
  },
];
export const MENU_ITEMS_ADMINISTRADOR_SISTEMA: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'fa fa-home',
    link: '/stepi/dashboard',
    home: true,
  },
  {
    title: 'Usuarios',
    icon: 'fa fa-user',
    children: [
      {
        title: 'Mostrar',
        link: '/stepi/usuarios/consultar',
      },
    ],
  },
  {
    title: 'Funcionarios',
    icon: 'fa fa-users',
    children: [
      {
        title: 'Mostrar',
        link: '/stepi/funcionarios/consultar',
      },
    ],
  },
];
export const MENU_ITEMS_PRESUPUESTO: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'fa fa-home',
    link: '/stepi/dashboard',
    home: true,
  },
  {
    title: 'Horas Extra',
    icon: 'far fa-clock',
    children: [
      {
        title: 'Mostrar',
        link: '/stepi/horas-extra/solicitud/listar-presupuesto',
      },
    ],
  },
  {
    title: 'Horas Adicionales',
    icon: 'fas fa-clock',
    children: [
      {
        title: 'Mostrar',
        link: '/stepi/horas-extra/adicionales/listar-presupuesto',
      },
    ],
  },
];

export const MENU_ITEMS_ADMINISTRATIVO: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'fa fa-home',
    link: '/stepi/dashboard',
    home: true,
  },
  {
    title: 'Horas Extra',
    icon: 'far fa-clock',
    children: [
      {
        title: 'Mostrar',
        link: '/stepi/horas-extra/solicitud/listar-administracion',
      },
      {
        title: 'Aprobación',
        link: '/stepi/horas-extra/solicitud/aprobacion',
      },
    ],
  },
  {
    title: 'Horas Adicionales',
    icon: 'fas fa-clock',
    children: [
      {
        title: 'Mostrar',
        link: '/stepi/horas-extra/adicionales/listar-administracion',
      },
      {
        title: 'Aprobación',
        link: '/stepi/horas-extra/adicionales/aprobacion',
      },
    ],
  },
  {
    title: 'Reportes',
    icon: 'fas fa-chart-area',
    children: [
      {
        title: 'Horas solicitadas vs utilizadas',
        link: '/stepi/reportes/solicitadas-vsaprobadas'
      },
      {
        title: 'Motivos',
        link: '/stepi/reportes/porcentaje-motivos'
      },
      {
        title: 'Ausencias por persona',
        link: '/stepi/reportes/ausencias-persona'
      }
    ]
  }
];

export const MENU_ITEMS_SUPERVISOR: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'fa fa-home',
    link: '/stepi/dashboard',
    home: true,
  },
  {
    title: 'Horas Extra',
    icon: 'far fa-clock',
    children: [
      {
        title: 'Mostrar',
        link: '/stepi/horas-extra/solicitud/listar-administracion',
      },
      {
        title: 'Aprobación',
        link: '/stepi/horas-extra/solicitud/aprobacion',
      },
    ]
  },
  {
    title: 'Conteo',
    icon: 'fas fa-clipboard-list',
    children: [
      {
        title: 'Realizar',
        link: '/stepi/conteo',
      },
    ],
  },
];
