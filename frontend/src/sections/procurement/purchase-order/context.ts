import { PurchaseOrderFormValues } from '../../../types/procurements/purchase-orders';
import { Columns } from '../../../types/ui';

export const TABLE_COLUMNS: Array<Columns> = [
  { id: 'code', label: 'Código' },
  { id: 'supplier', label: 'Proveedor' },
  { id: 'order_date', label: 'Fecha de orden' },
  { id: 'confirmed_date', label: 'Fecha de confirmación' },
  { id: 'main_total', label: 'Total' },
  { id: 'status', label: 'Estado' },
  { id: 'id', label: 'Opciones', align: 'right', sort: false },
];

export const DETAIL_TABLE_COLUMNS:Columns[] = [
  { id: 'item_name', label: 'Artículo' },
  { id: 'quantity', label: 'Cantidad', align: 'center' },
  { id: 'price', label: 'Precio', align: 'center' },
]

export const BREADCRUMB_ADD_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Ordenes de compras',
    route: '/purchase-order',
    type: 'link',
  },
  {
    name: 'Nueva orden de compra',
    type: 'typography',
  },
];

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Ordenes de compra',
    type: 'typography',
  },
  {
    name: 'Listado',
    type: 'typography',
  },
];

export const QUERY_KEYS = {
  list: 'purchase-orders',
  disabled: 'disabled-purchase-orders'

}

export const DEFAULT_FORM_VALUES:PurchaseOrderFormValues = {
  main_currency: null,
  secondary_currency: null,
  exchange_rate: 0,
  comment: '',
  discount: 0.00,
  order_date: null,
  confirmed_date: null,
  required_date: null,
  status: 'Pendiente',
  payment_term: null,
  main_total: 0.00,
  amount_paid: 0.00,
  secondary_total: 0.00,
  tax: null,
  detail: [],
  payments: [],
};