import { Columns } from "../../../types/ui"

export const TABLE_COLUMNS: Array<Columns> = [
    { id: 'name', label: 'Nombre' },
    { id: 'category', label: 'Categoía' },
    { id: 'stock', label: 'Stock actual', align: 'center' },
    { id: 'reserved', label: 'Reservados', align: 'center' },
    { id: 'available', label: 'Disponibles', align: 'center' },
    { id: 'min_stock', label: 'Stock mínimo', align: 'center' },
    { id: 'max_stock', label: 'Stock máximo', align: 'center' },
]

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Existencias actuales',
    type: 'typography'
  },
  {
    name: 'Reporte',
    type: 'typography'
  }
]