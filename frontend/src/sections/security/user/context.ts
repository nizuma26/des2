import { Columns } from "../../../types/ui"

export const headLabel:Columns[] = [
  { id: 'username', label: 'Nombres' },
  { id: 'cedula', label: 'Cédula' },
  { id: 'laboratory', label: 'Laboratorio' },
  { id: 'role', label: 'Rol' },
  { id: 'is_active', label: 'Estado', align: 'center' },
  { id: 'id', label: 'Opciones', align: 'right', sort: false },
]

export const breadcrumbViewPage = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Usuarios',
    route: '/user',
    type: 'link'
  },
  {
    name: 'Listado',
    type: 'typography'
  }
]

export const breadcrumbAddPage = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Usuarios',
    route: '/user',
    type: 'link'
  },
  {
    name: 'Nuevo usuario',
    type: 'typography'
  }
]

export const QUERY_KEYS = {
  list: 'users',
  cashRegisters: 'user-cash-register',
  permissions: 'user-permissions'
}