import { Columns } from "../../../types/ui"

export const headLabel:Columns[] = [
    { id: 'name', label: 'Nombre'},
    { id: 'document', label: 'Rif' },
    { id: 'email', label: 'Email' },
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
      name: 'Laboratorios',
      route: '/laboratory',
      type: 'link'
    },
    {
      name: 'Nuevo Laboratorio',
      type: 'typography'
    }
  ]

export const breadcrumbViewPage = [
    {
      name: 'Dashboard',
      route: '/',
      type: 'link'
    },
    {
      name: 'Laboratorios',
      route: '#',
      type: 'link'
    },
    {
      name: 'Listado',
      type: 'typography'
    }
  ]

export const lab = [
  {
    id: 1,
    codigo: 'LAB0001',
    nombre: 'Valero-Amaya',
    documento: 'j-0220220',
    email: 'amaya22@gmail.com',
    activo: true,
    principal: true,
  },
  {
    id: 2,
    codigo: 'LAB0002',
    nombre: 'LABORATORIO 22',
    documento: 'S-200000',
    email: 'lab22@gmail.com',
    activo: false,
    principal: false,
  }
]