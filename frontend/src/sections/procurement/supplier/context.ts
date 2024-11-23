import { Columns } from "../../../types/ui"

export const headLabel: Array<Columns> = [
    { id: 'trade_name', label: 'Nombre' },
    { id: 'rif', label: 'RIF' },
    { id: 'email', label: 'Email' },
    { id: 'phone_number', label: 'Número de telefono' },
    { id: 'is_active', label: 'Estado', align: 'center' },
    { id: 'id', label: 'Opciones', align: 'right', sort: false },
]

export const breadcrumbAddPage = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Proveedores',
    route: '/supplier',
    type: 'link'
  },
  {
    name: 'Nuevo proveedor',
    type: 'typography'
  }
]

export const breadcrumbListPage = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Proveedores',
    type: 'typography'
  },
  {
    name: 'Listado',
    type: 'typography'
  }
]

export const DEFAULT_FORM_VALUES = {
  trade_name: '',
  legal_name: '',
  rif: '',
  email: '',
  phone_number: '',
  address: '',
  description: '',
  contact_person: '',
  credit_limit: 0.0,
  credit_days: 15,
  postal_code: '',
  is_active: true,
};