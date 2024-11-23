import { Columns } from "../../../types/ui"

export const APPROVALS_TABLE_COLUMNS: Array<Columns> = [
  { id: 'code', label: 'Código' },
  { id: 'requester', label: 'Solicitante' },
  { id: 'laboratory', label: 'Laboratorio' },
  { id: 'request_date', label: 'Fecha de requisición' },
  { id: 'required_date', label: 'Fecha requerida' },
  { id: 'status', label: 'Estado' },
  { id: 'id', label: 'Opciones', align: 'right', sort: false },
]

export const REQUISITION_TABLE_COLUMNS: Array<Columns> = [
    { id: 'code', label: 'Código' },
    { id: 'requester', label: 'Solicitante' },
    { id: 'laboratory', label: 'Laboratorio' },
    { id: 'request_date', label: 'Fecha de requisición' },
    { id: 'required_date', label: 'Fecha requerida' },
  ]

export const REQUISITION_DETAIL_TABLE_COLUMNS:Columns[] = [
  { id: 'item_name', label: 'Artículo', sort: false },
  { id: 'quantity', label: 'Cantidad solicitada', align: 'center', sort: false },
  { id: 'item_measure_unit', label: 'Unidad de medida', align: 'center', sort: false },
  { id: 'approved_amount', label: 'Cantidad aprobada', align: 'center', sort: false },
]

export const BREADCRUMB_PENDING_REQUISITION_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Aprobaciones',
    type: 'typography'
  },
  {
    name: 'Requisiciones de compra pendientes',
    type: 'typography'
  }
]

export const BREADCRUMB_APPROVE_REQUISITION_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Aprobaciones',
    route: '/approval-requisitions',
    type: 'link'
  },
  {
    name: 'Aprobar requisiciones',
    type: 'typography'
  }
]

//Query keys para almacenas datos en cache
export const QUERY_KEY = {
    requisition: 'pending-requisitions',
    order: 'pending-orders'
}