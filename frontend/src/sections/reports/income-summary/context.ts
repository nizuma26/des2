import { Columns } from "../../../types/ui"

export const TABLE_COLUMNS: Array<Columns> = [
    { id: 'id', label: '', sort: false },
    { id: 'order_code', label: 'N° de orden' },
    { id: 'patient', label: 'Paciente' },
    { id: 'invoice_number', label: 'Nº Fac' },
    { id: 'main_total', label: 'Total' },
    { id: 'amount_paid', label: 'Abonado' },
    { id: '', label: 'Saldo' },
]

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Resumen de ingresos',
    type: 'typography'
  },
  {
    name: 'Reporte',
    type: 'typography'
  }
]