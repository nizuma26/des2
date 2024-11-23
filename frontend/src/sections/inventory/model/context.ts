import { Columns } from '../../../types/ui';

export const TABLE_COLUMNS: Columns[] = [
  { id: 'name', label: 'Nombre' },
  { id: 'brand_name', label: 'Marca' },
  { id: 'id', label: 'Opciones', align: 'right', sort: false },
];

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Modelos',
    type: 'typography',
  },
  {
    name: 'Listado',
    type: 'typography',
  },
];

export const FORM_VALUES = {
  name: '',
  brand: null,
  brand_name: '',
  is_active: true,
};

export const QUERY_KEYS = {
  list: 'models',
};
