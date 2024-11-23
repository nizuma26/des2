import { Columns } from "../../../../types/ui";

export const PAYMENTS_TABLE_COLUMNS:Columns[] = [
  {id: 'id', label: '', align: 'center', sort: false},
  {id: 'payment_amount', label: 'Monto'},
  {id: 'payment_method', label: 'Método de pago'},
  {id: 'payment_date', label: 'Fecha'},
  {id: 'bank', label: 'Banco'},
  {id: 'payment_ref', label: 'Ref#'},
]

export const DEFAULT_FORM_VALUES = {
  payment: 1,
  payment_method: 'Efectivo',
  payment_ref: '',
  comment: '',
  bank: null
}

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

export const QUERY_KEYS = {
  payments: 'payments'
}
