import { Columns } from '../../../types/ui';

export const PENDING_RECEPTION_TABLE_COLUMNS: Array<Columns> = [
  { id: 'code', label: 'Código', width: "6%" },
  { id: 'supplier', label: 'Proveedor' },
  { id: 'order_date', label: 'Fecha de emisión' },
  { id: 'confirmed_date', label: 'Fecha de confirmación' },
  { id: 'main_total', label: 'Total' },
];

export const PARTIALLY_RECEIVED_TABLE_COLUMNS: Array<Columns> = [
  { id: 'code', label: 'Código', width: "6%" },
  { id: 'supplier', label: 'Proveedor' },
  { id: 'reception_date', label: 'Fecha de emisión' },
  { id: 'confirmed_date', label: 'Fecha de confirmación' },
  { id: 'main_total', label: 'Total' },
];

export const DETAIL_TABLE_COLUMNS:Columns[] = [
  { id: 'item_name', label: 'Artículo', sort: false },
  { id: 'received_quantity', label: 'Recibido', width: '15%', align: 'center', sort: false },
  { id: 'expected_quantity', label: 'Recibido', width: '20%', align: 'center', sort: false },
  { id: 'comment', label: '', align: 'center', width: '10%', sort: false },
]

export const BREADCRUMB_ADD_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Recepcion de Ordenes de Compras',
    type: 'typography',
  },
  {
    name: 'Iniciando Recepción',
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
    name: 'Recepcion de Ordenes de Compras',
    type: 'typography',
  },
  {
    name: 'Listado',
    type: 'typography',
  },
];

export const QUERY_KEYS = {
  PENDING: 'pendingReception',
  PARTIALLY_RECEIVED: 'partiallyReceived'
}

export const RECEIVING_ORDER_STATUS = [
  { value: "Completamente Recibido", label: "Completamente Recibido" },
  { value: "Parcialmente Recibido", label: "Parcialmente Recibido" },
]
