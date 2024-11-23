import { Columns } from "../../../types/ui"

export const headLabel: Array<Columns> = [
    { id: 'code', label: 'Código' },
    { id: 'laboratory', label: 'Laboratorio' },
    { id: 'supplier', label: 'Proveedor' },
    { id: 'payment_method', label: 'Método de pago' },
    { id: 'last_date', label: 'Ultima fecha' },
    { id: 'total_bs', label: 'Total BS' },
    { id: 'selected_currency_total', label: 'Total USD' },
    { id: 'status', label: 'Estado' },
    { id: 'id', label: 'Opciones', align: 'right', sort: false },
]

export const detail:Columns[] = [
  { id: 'item', label: 'Artículo', sort: false, width: '31%' },
  { id: 'quantity', label: 'Cantidad', sort: false, width: '12%'},
  { id: 'cost_bs', label: 'Costo unitario BS.', sort: false, width: '12%' },
  { id: 'selected_currency_cost', label: 'Costo USD.', sort: false, width: '4%' },
  { id: 'tax', label: 'impuesto', align: 'center' , sort: false, width: '12%'},
  { id: 'discount', label: 'descuento', align: 'center' , sort: false, width: '12%'},
  { id: 'total_bs', label: 'Total BS', align: 'center' , sort: false, width: '12%'},
  { id: 'selected_currency_total', label: 'Total USD', align: 'right' , sort: false, width: '5%'}
]

export const statusOptions = [
  { value: 'En proceso', label: 'En proceso' },
  { value: 'Finalizado', label: 'Finalizado' },
];

export const breadcrumbAddPage = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link'
  },
  {
    name: 'Ordenes de Compras',
    route: '/purchase',
    type: 'link'
  },
  {
    name: 'Nueva compra',
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
    name: 'Ordenes de Compras',
    type: 'typography'
  },
  {
    name: 'Listado',
    type: 'typography'
  }
]