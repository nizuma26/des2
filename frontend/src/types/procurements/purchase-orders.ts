import { Dayjs } from 'dayjs';
import { PaymentMethod } from '../payment/payment-method';

export type OrderStatus = 'Borrador' | 'Pendiente' | 'Parcialmente Recibido' | 'Completamente Recibido' | 'Anulado' | 'Cerrada';

export interface PurchaseOrderList {
  id: number;
  code: string | null;
  supplier: string;
  order_date: string | null;
  confirmed_date: string | null;
  order_hour?: string;
  main_total: number;
  status: OrderStatus;
}

export interface PurchaseOrderDetail {
  item_id: number;
  item_code?: string;
  item_name: string;
  item_category: string;
  item_measure_unit: string;
  with_tax: boolean;
  quantity: number;
  price?: number;
}

export interface Payments {
  id?: number;
  payment_method: PaymentMethod;
  payment_ref: string;
  payment_date?: string;
  payment_time?: string;
  payment_amount: number;
  comment: string;
  purchase_order?: string;
  bank?: string;
}

export type PaymentFormValues = Omit<Payments, 'bank' | 'currency' | 'purchase_order'> & {
  purchase_order?: number;
  bank?: number;
  currency?: number;
};

export interface PurchaseOrder {
  id: number;
  code: string;
  user: string;
  cash_register: string;
  laboratory: {
    name: string;
    document: string;
    logo: string;
    address: string;
  };
  order_date: string;
  due_date: string;
  confirmed_date: string;
  order_hour: string;
  main_currency: { id: number; code: string };
  secondary_currency: { id: number; code: string };
  tax?: { id: number; name: string; tax: number };
  supplier: {
    id: number;
    trade_name: string;
    legal_name: string;
    rif: string;
    postal_code: string;
    address: string;
  };
  exchange_rate: number;
  created_at?: string;
  comment: string;
  discount?: number | null;
  main_total: number;
  amount_paid: number;
  secondary_total: number;
  payment_term: number | null;
  status: OrderStatus;
  balance: number;
  detail: PurchaseOrderDetail[];
  payments: Payments[];
}

export type PurchaseOrderFormValues = Pick<
  PurchaseOrder,
  | 'comment'
  | 'detail'
  | 'status'
  | 'exchange_rate'
  | 'discount'
  | 'payment_term'
  | 'main_total'
  | 'secondary_total'
  | 'amount_paid'
> & {
  id?: number;
  requisition?: number;
  required_date: Dayjs | null;
  confirmed_date: Dayjs | null;
  order_date: Dayjs | null;
  laboratory?: number | null;
  supplier?: number | null;
  main_currency: number | null;
  tax: number | null;
  secondary_currency: number | null;
  payments: PaymentFormValues[];
};
