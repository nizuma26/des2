import { Columns } from "../../../../types/ui"

export const TABLE_COLUMNS: Array<Columns> = [
    { id: 'name', label: 'Examen' },
    { id: 'category', label: 'Categoría' },
    { id: 'total_requests', label: 'Solicitados', align: 'center' },
]

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Examenes mas solicitados',
    type: 'typography'
  },
  {
    name: 'Reporte',
    type: 'typography'
  }
]

export const QUERY_KEYS = {
  LIST: 'mostRequestedLabTest'
}