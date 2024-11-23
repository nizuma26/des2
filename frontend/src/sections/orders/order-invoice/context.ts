import { Columns } from '../../../types/ui';
import { OrderInvoiceFormValues } from '../../../types/orders/order-invoice';
import { PatientPaymentFormValues } from '../../../types/orders/payments';

export const TABLE_COLUMNS: Array<Columns> = [
  { id: 'code', label: 'Orden', width: '12%', sort: false },
  { id: 'order_date', label: 'Fecha', sort: false },
  { id: 'patient_full_name', label: 'Paciente', sort: false },
  { id: 'patient_cedula', label: 'Cédula', sort: false },
  { id: 'main_total', label: 'Total', sort: false },
  { id: 'amount_paid', label: 'Pagado', sort: false },
  { id: 'balance', label: 'Saldo', sort: false },
  { id: 'lab_tests', label: 'Examenes', align: 'center', sort: false },
];

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Ordenes Pendientes',
    type: 'typography',
  },
  {
    name: 'Listado',
    type: 'typography',
  },
];

export const BREADCRUMB_ADD_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Carga de Resultados',
    route: '/order',
    type: 'link',
  },
  {
    name: 'Nueva orden',
    type: 'typography',
  },
];

export const DEFAULT_FORM_VALUES: OrderInvoiceFormValues = {
  tax: null,
  patient: '',
  on_behalf: 'Empresa',
  comment: '',
  status: 'Pendiente',
  payment_type: 'Contado',
  client_name: '',
  address: '',
  phone_number: '',
  ci_or_rif: '',
  client_id: null,
  total: 0.00,
  discount: 0.00,
  secondary_total: 0.00,
  orders: [],
};

export const DEFAULT_PAYMENT_FORM_VALUES: PatientPaymentFormValues = {
  payment_amount: 1,
  payment_method: 'Efectivo',
  payment_ref: '',
  comment: '',
  bank: null,
};

export const QUERY_KEYS = {
  pendingOrders: 'pending-orders',
  captureResult: 'capture-result',
  searchClient: 'searchClient'
};

export const ON_BEHALF = [
  { value: 'Persona', label: 'Persona', labelPlacement: 'start' },
  { value: 'Empresa', label: 'Empresa', labelPlacement: 'start' },
]
