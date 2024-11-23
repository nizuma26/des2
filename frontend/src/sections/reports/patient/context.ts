import { Columns } from "../../../types/ui"

export const TABLE_COLUMNS: Array<Columns> = [
    { id: 'full_name', label: 'Paciente' },
    { id: 'cedula', label: 'Cédula' },
    { id: 'birthdate', label: 'Fecha de nacimiento' },
    { id: 'id', label: 'Edad', align: 'center' },
    { id: 'gender', label: 'Género' },
    { id: 'order_date', label: 'Fecha de atención' },
]

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Pacientes atendidos',
    type: 'typography'
  },
  {
    name: 'Reporte',
    type: 'typography'
  }
]