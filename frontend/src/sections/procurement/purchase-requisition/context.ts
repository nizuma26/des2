import { Columns } from "../../../types/ui"

export const TABLE_COLUMNS: Array<Columns> = [
    { id: 'code', label: 'Código' },
    { id: 'requester', label: 'Solicitante' },
    { id: 'laboratory', label: 'Laboratorio' },
    { id: 'request_date', label: 'Fecha de requisición' },
    { id: 'required_date', label: 'Fecha requerida' },
    { id: 'status', label: 'Estado' },
    { id: 'id', label: 'Opciones', align: 'right', sort: false },
]

export const DETAIL_TABLE_COLUMNS:Columns[] = [
  { id: 'item_name', label: 'Artículo' },
  { id: 'quantity', label: 'Cantidad', align: 'center', disablePadding: true },
  { id: 'item_measure_unit', label: 'Unidad de medida', align: 'center', disablePadding: true },
]

export const BREADCRUMB_ADD_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Requisiciones de compra',
    route: '/purchase-requisition',
    type: 'link'
  },
  {
    name: 'Nueva compra',
    type: 'typography'
  }
]

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Requisiciones de compra',
    type: 'typography'
  },
  {
    name: 'Listado',
    type: 'typography'
  }
]

export const QUERY_KEYS = {
  list: 'requisitions'
}