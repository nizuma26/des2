import { Columns } from '../../../types/ui';

export const TABLE_COLUMNS: Array<Columns> = [
  { id: 'name', label: 'Nombre' },
  { id: 'id', label: 'Opciones', align: 'right', sort: false },
];

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Contenedores',
    type: 'typography',
  },
  {
    name: 'Listado',
    type: 'typography',
  },
];

export const DEFAULT_FORM_VALUES = {
  name: '',
  is_active: true,
};

export const QUERY_KEYS = {
  all: 'containers',
  enabled: 'enablesContainers',
  disables: 'inactiveContainers'
}