import { Columns } from "../../../types/ui"

export const TABLE_COLUMNS:Columns[] = [
    { id: 'name', label: 'Nombre', },
    { id: 'is_active', label: 'Activo', align: 'center' },
    { id: 'id', label: 'Opciones', align: 'right', sort: false },
]

export const BREADCRUMB_LIST_PAGE = [
    {
      name: 'Dashboard',
      route: '/',
      type: 'link'
    },
    {
      name: 'Categorías',
      type: 'typography'
    },
    {
      name: 'Listado',
      type: 'typography'
    }
]

export const FORM_VALUES = {
  name: '',
  is_active: true,
};

export const QUERY_KEYS = {
  list: 'categories',
};