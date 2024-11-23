import { Columns } from '../../../types/ui';
import { PatientPaymentFormValues } from '../../../types/orders/payments';

export const TABLE_COLUMNS: Array<Columns> = [
  { id: 'id', label: '', width: '7%', sort: false },
  { id: 'patient_number', label: 'Nº paciente', width: '10%', align: 'center', sort: false },
  { id: 'patient_full_name', label: 'Paciente', sort: false },
  { id: 'patient_cedula', label: 'Cédula', sort: false },
  { id: 'code', label: 'Orden', width: '12%', sort: false },
  { id: 'order_date', label: 'Fecha de orden', sort: false },
];

export const PARAMETER_SIMPLE_COLUMNS: Array<Columns> = [
  { id: 'name', label: 'Abreviatura' },
  { id: 'result_value', label: 'Resultado' },
  { id: 'measure_unit', label: 'Unidad de medida' },
];

export const PARAMETER_COMPOSITE_COLUMNS: Array<Columns> = [
  { id: 'abbreviation', label: 'Abreviatura' },
  { id: 'name', label: 'Examen' },
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
};
