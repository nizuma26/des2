import { Order, OrderDetail } from '../../../../../types/orders/orders';

export type PatientData = Omit<Order['patient'], 'id'>;
export type AffiliationData = Pick<Order['affiliation'], 'name'>;
export type OrderDetailData = Pick<Order, 'detail'>;
export type OrderDataCardProps = Pick<
  Order,
  'comment' | 'order_date' | 'hour' | 'status' | 'code' | 'user' | 'laboratory' | 'cost_type' | 'cash_register' | 'payment_type'
>;

export interface PatientDataCardProps {
  patient: PatientData;
  affiliation: AffiliationData;
}

export interface InvoiceDataCardProps {
  totalLabTests: number;
  mainTotal: number;
  exchangeRate: number;
  mainCurrencyCode: string;
  secondaryTotal: number;
  secondaryCurrencyCode: string;
  discount: number;
  amountPaid: number;
  tax?: { id:number, name: string, tax: number }
}

export interface OrderDetailTableCardProps {
  labTests: OrderDetail[];
  mainCurrencyCode: string;
  secondaryCurrencyCode: string;
}

export interface OrderDetailProps {
  data: Order;
  updatePaidData: (balance: number, amountPaid: number) => void;
  updateStatus:  (invoiceNumber: string) => void;
}