import dayjs from "dayjs";

import { Columns } from "../../../types/ui"
import { OrderFormValues } from "../../../types/orders/orders";
import { PatientPaymentFormValues } from "../../../types/orders/payments";

export const TABLE_COLUMNS: Array<Columns> = [
    { id: 'code', label: 'Código', width: '12%' },
    { id: 'patient_names', label: 'Paciente'},
    { id: 'order_date', label: 'Fecha' },
    { id: 'main_total', label: 'Total' },
    { id: 'status', label: 'Estado' },
    { id: 'id', label: 'Opciones', align: 'right', sort: false },
]

export const LAB_TEST_TABLE: Array<Columns> = [
  { id: 'abbreviation', label: 'Abreviatura' },
  { id: 'name', label: 'Examen' },
  { id: 'price1', label: 'Precio' },
]

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Ordenes',
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
    name: 'Ordenes',
    route: '/order',
    type: 'link',
  },
  {
    name: 'Nueva orden',
    type: 'typography',
  },
];

const currentDay = dayjs().format('YYYY-MM-DD');

export const DEFAULT_FORM_VALUES:OrderFormValues = {
  tax: null,
  main_currency: null,
  secondary_currency: null,
  patient: null,
  affiliation: null,
  exchange_rate: 0,
  comment: '',
  discount: 0.00,
  keep_patient_number: false,
  order_date: dayjs(currentDay),
  delivery_date: dayjs(currentDay),
  patient_number: null,
  status: 'Pendiente',
  cost_type: 'standard',
  payment_type: 'Contado',
  main_total: 0.00,
  amount_paid: 0.00,
  secondary_total: 0.00,
  detail: [],
  payments: [],
};

export const DEFAULT_PAYMENT_FORM_VALUES:PatientPaymentFormValues = {
  payment_amount: 1,
  payment_method: 'Efectivo',
  payment_ref: '',
  comment: '',
  bank: null
}

export const QUERY_KEYS = {
  list: 'orders',
  payments: 'payments'
};

export const GENDER_CHOICES = [
  {
    value: 'M',
    label: 'Masculino',
  },
  {
    value: 'F',
    label: 'Femenino',
  }
]

export const PAYMENT_TYPES_CHOICES = [
  {
    value: 'Contado',
    label: 'Contado',
  },
  {
    value: 'Crédito',
    label: 'Crédito',
  }
]

export const COST_TYPE = [
  {
    value: "standard",
    label: "Particular"
  },
  {
    value: "emergency",
    label: "Emergencia"
  },
  {
    value: "affiliated",
    label: "Seguro/Empresa"
  },
  {
    value: "home_service",
    label: "Domicilio"
  },
  {
    value: "holiday",
    label: "Fin de semana y feriados"
  },
  {
    value: "exempt",
    label: "Exonerado"
  }
]

export const PAYMENTS_TABLE_COLUMNS:Columns[] = [
  {id: 'bank', label: '', align: 'center', sort: false},
  {id: 'payment_amount', label: 'Monto'},
  {id: 'payment_method', label: 'Método de pago'},
  {id: 'bankName', label: 'Banco'},
  {id: 'payment_ref', label: 'Ref#'},
]

export const PAYMENT = {
  methods: [
    {
      value: 'Efectivo',
      label: 'Efectivo',
    },
    {
      value: 'Pago movil',
      label: 'Pago movil',
    },
    {
      value: 'Transferencia',
      label: 'Transferencia',
    },
    {
      value: 'Divisa',
      label: 'Divisa',
    },
    {
      value: 'Tarjeta de débito',
      label: 'Tarjeta de débito',
    },
    {
      value: 'Tarjeta de crédito',
      label: 'Tarjeta de crédito',
    },
    {
      value: 'Cheque',
      label: 'Cheque',
    },
    {
      value: 'Otros',
      label: 'Otros',
    },
  ],
  types: [
    {
      value: 'Contado',
      label: 'Contado',
    },
    {
      value: 'Crédito',
      label: 'Crédito',
    },
  ],
};
