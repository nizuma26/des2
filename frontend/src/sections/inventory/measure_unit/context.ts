import { Columns } from "../../../types/ui"

export const headLabel:Columns[] = [
    { id: 'name', label: 'Nombre' },
    { id: 'is_active', label: 'Activo', align: 'center' },
    { id: 'id', label: 'Opciones', align: 'right', sort: false },
]

export const breadcrumbListPage = [
    {
      name: 'Dashboard',
      route: '/',
      type: 'link'
    },
    {
      name: 'Unidades de medida',
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
  list: 'measure-units',
};