import { AccountPayablePaymentFormValues } from '../../../types/procurements/account-payable';
import { Columns } from '../../../types/ui';

export const DEBT_SUPPLIER_COLUMNS: Columns[] = [
  { id: 'trade_name', label: 'Proveedor' },
  { id: 'rif', label: 'RIF' },
  { id: 'phone_number', label: 'Número de teléfono' },
  { id: 'total_debt', label: 'Deuda' },
];

export const ACCOUNT_PAYABLE_COLUMNS: Columns[] = [
  { id: 'id', label: '', width: '2%' },
  { id: 'code', label: 'Código' },
  { id: 'created_at', label: 'Fecha de creación', align: 'center' },
  { id: 'due_date', label: 'Vencimiento', align: 'center' },
  { id: 'amount_paid', label: 'Abonos', align: 'center' },
  { id: 'balance', label: 'Saldo' },
];

export const PAYMENT_COLUMNS: Columns[] = [
  { id: 'id', label: '', align: 'right', width: '2%', sort: false },
  { id: 'created_at', label: 'Fecha de pago' },
  { id: 'payment_method', label: 'Método de pago' },
  { id: 'bank', label: 'Banco', align: 'center' },
  { id: 'payment_ref', label: 'Referencia', align: 'center' },
  { id: 'payment_amount', label: 'Monto' },
];

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Cuentas por pagar',
    type: 'typography',
  },
  {
    name: 'Listado',
    type: 'typography',
  },
];

export const paymentMethodOptions = [
  { value: 'Efectivo', label: 'Efectivo' },
  { value: 'Transferencia', label: 'Transferencia' },
  { value: 'Cheque', label: 'Cheque' },
];

export const QUERY_KEYS = {
  DEBT_SUPPLIERS: 'debtToSuppliers',
  ACCOUNT_PAYABLE: 'accountPayables',
  PAYMENT: 'payments',
};

export const PAYMENT = {
  methods: [
    {
      value: 'Efectivo',
      label: 'Efectivo',
      icon: 'ic_money',
    },
    {
      value: 'Pago movil',
      label: 'Pago movil',
      icon: 'ic_mobile_payment',
    },
    {
      value: 'Transferencia',
      label: 'Transferencia',
      icon: 'ic_transfer',
    },
    {
      value: 'Divisa',
      label: 'Divisa',
      icon: 'ic_money_dollar',
    },
    {
      value: 'Tarjeta de débito',
      label: 'Tarjeta de débito',
      icon: 'ic_credit_card',
    },
    {
      value: 'Tarjeta de crédito',
      label: 'Tarjeta de crédito',
      icon: 'ic_credit_card',
    },
    {
      value: 'Cheque',
      label: 'Cheque',
      icon: 'ic_cheque',
    }
  ],
};

export const DEFAULT_FORM_VALUES_PAYMENT:AccountPayablePaymentFormValues = {
  account_payable: null,
  payment_method: '',
  comment: '',
  payment_amount: 0,
  payment_ref: '',
  bank: null,
};
