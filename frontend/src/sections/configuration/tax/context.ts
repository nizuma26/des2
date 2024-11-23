import { Tax } from '../../../types/configuration/tax';
import { Columns } from '../../../types/ui';

export const TABLE_COLUMNS: Array<Columns> = [
  { id: 'name', label: 'Nombre' },
  { id: 'tax', label: 'Tasa' },
  { id: 'type_tax', label: 'Tipo' },
  { id: 'id', label: 'Opciones', align: 'right', sort: false },
];

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Impuestos',
    type: 'typography',
  },
  {
    name: 'Listado',
    type: 'typography',
  },
];

export const DEFAULT_FORM_VALUES:Tax = {
  name: '',
  tax: 0,
  type_tax: 'General',
  is_active: true,
};

export const QUERY_KEYS = {
  list: 'taxes'
}

export const TYPE_TAX = [
  {value: "General", label: "General"},
  {value: "Pagos", label: "Aplicar a pagos"},
]