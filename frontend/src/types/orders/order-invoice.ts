import { Order } from './orders';
import { PaymentType } from './payments';

type OrderData = Pick<
  Order,
  | 'id'
  | 'code'
  | 'user'
  | 'patient'
  | 'affiliation'
  | 'main_total'
  | 'secondary_total'
  | 'amount_paid'
  | 'balance'
  | 'tax'
  | 'detail'
>;

type InvoiceStatus = 'Pagado' | 'Pendiente' | 'Anulado';

export interface OrderInvoice {
  order: string[];
  invoice_number?: string;
  invoice_date: string;
  patient?: string;
  client_name: string;
  address: string;
  phone_number?: string;
  ci_or_rif?: string;
  hour: string;
  status: InvoiceStatus;
  total: number;
  secondary_total: number;
  discount: number;
  tax?: string;
  payment_type?: PaymentType;
  comment?: string;
}

export interface OrderToBillList {
  id: number;
  code: string;
  patient_full_name: string;
  patient_cedula: string;
  order_date: string;
  balance: number
  main_total: number;
  lab_tests: number;
  amount_paid: number;
  secondary_total: number;
}

export type OrderInvoiceFormValues = Omit<OrderInvoice, 'order' | 'invoice_date' | 'hour' | 'tax' > & {
  orders: number[];
  on_behalf: 'Persona' | 'Empresa';
  client_id: number | null;
  total: number;
  tax: number | null;
  secondary_total: number;
};
