import { Columns } from "../../../types/ui";

export const headLabel:Columns[] = [
    { id: 'code', label: 'Código', disablePadding: true, align: 'center' },
    { id: 'laboratory', label: 'Laboratorio' },
    { id: 'user',  label: 'Usuario' },
    { id: 'last_date', label: 'Fecha de registro'},
    { id: 'total', label: 'Total' },
    { id: 'status', label: 'Estado' },
    { id: 'id', label: 'Opciones', align: 'right', sort: false },
]

export const detail:Columns[] = [
    { id: '', label: '', align: 'center' },
    { id: 'name', label: 'Artículo' },
    { id: 'category', label: 'Categoría' },
    { id: 'stock', label: 'Stock', width: '15%' },
    { id: 'price', label: 'Costo unitario', width: '20%' },
    { id: 'subtotal', label: 'subtotal', align: 'center' }
]

export const statusOptions = [
  { value: 'En proceso', label: 'En proceso' },
  { value: 'Finalizado', label: 'Finalizado' },
];

export const breadcrumbViewPage = [
    {
      name: 'Dashboard',
      route: '/',
      type: 'link'
    },
    {
      name: 'Inventario inicial',
      type: 'typography'
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
      name: 'Inventario inicial',
      route: '/beginning-inventory',
      type: 'link'
    },
    {
      name: 'Nuevo inventario inicial',
      type: 'typography'
    }
  ]