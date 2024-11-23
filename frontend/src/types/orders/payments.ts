import { Payment } from "../common/payment";

export type PaymentType = 'Contado' | 'Crédito';

export type PaymentMethod =
  | 'Efectivo'
  | 'Pago movil'
  | 'Transferencia'
  | 'Tarjeta de debito'
  | 'Tarjeta de credito'
  | 'Divisa'
  | 'Cheque'
  | 'Otros';

export interface PatientPayment extends Payment {
  id?: number;
  order?: string;
}

export type PatientPaymentFormValues = Omit<Payment, 'bank'> & {
  order?: number;
  bank: number | null;
  bankName?: string;
}
