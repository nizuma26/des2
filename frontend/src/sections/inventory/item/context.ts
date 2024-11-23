import { Columns } from "../../../types/ui"

export const headLabel:Columns[] = [
    { id: 'name', label: 'Nombre', width: '26%' },
    { id: 'item_type', label: 'Tipo de artículo' },
    { id: 'category', label: 'Categoría' },
    { id: 'brand', label: 'Marca' },
    { id: 'model', label: 'Modelo' },
    { id: 'isActive', label: 'Estado', align: 'center' },
    { id: 'id', label: 'Opciones', align: 'right', sort: false },
]

export const breadcrumbAddPage = [
    {
      name: 'Dashboard',
      route: '/',
      type: 'link'
    },
    {
      name: 'Artículos',
      route: '/item',
      type: 'link'
    },
    {
      name: 'Nuevo Artículo',
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
      name: 'Artículos',
      type: 'typography'
    },
    {
      name: 'Listado',
      type: 'typography'
    }
  ]