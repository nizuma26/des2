import { Columns } from "../../../types/ui";

export const headLabel:Columns[] = [
  { id: 'name', label: 'Nombre' },
  { id: 'permissions', label: 'Número de permisos', align: 'center' },
  { id: 'id', label: 'Opciones', align: 'right', sort: false },
];

export const breadcrumbAddPage = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Roles',
    route: '/role',
    type: 'link',
  },
  {
    name: 'Nuevo rol',
    type: 'typography',
  },
];

export const breadcrumbListPage = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Roles',
    route: '#',
    type: 'link',
  },
  {
    name: 'Listado',
    type: 'typography',
  },
];

export const PERMISSIONS = [
  {
    module: 'Usuario',
    permissions: [
      {
        id: 1,
        name: 'Agregar usuario',
      },
      {
        id: 2,
        name: 'Ver usuario',
      },
      {
        id: 3,
        name: 'Modificar usuario',
      },
      {
        id: 4,
        name: 'Eliminar usuario',
      },
    ],
  },
  {
    module: 'Laboratorio',
    permissions: [
      {
        id: 5,
        name: 'Agregar laboratorio',
      },
      {
        id: 6,
        name: 'Ver laboratorio',
      },
      {
        id: 7,
        name: 'Modificar laboratorio',
      },
      {
        id: 9,
        name: 'Eliminar laboratorio',
      },
    ],
  },
];
