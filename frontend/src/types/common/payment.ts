export type PaymentMethod =
  | 'Efectivo'
  | 'Pago movil'
  | 'Transferencia'
  | 'Tarjeta de debito'
  | 'Tarjeta de credito'
  | 'Divisa'
  | 'Cheque'
  | 'Otros';

export interface Payment {
    id?: number;
    payment_method: PaymentMethod | '';
    payment_ref: string;
    payment_date?: string;
    created_at?: string;
    payment_time?: string;
    payment_amount: number;
    comment: string;
    bank?: string;
  }