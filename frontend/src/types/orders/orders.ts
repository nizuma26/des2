import { Dayjs } from 'dayjs';

import { CostType, LabTestPrices } from '../configuration/lab-test';
import { PatientPayment, PatientPaymentFormValues, PaymentType } from './payments';

export type Status = 'Pendiente' | 'Borrador' | 'Parcialmente procesado' | 'Procesado' | 'Anulado';

export interface OrderList {
  id: number;
  code: string;
  patient_full_name: string;
  patient_last_names: string;
  patient_names: string;
  patient_cedula: string;
  order_date: string;
  hour: string;
  main_total: number;
  status: Status;
}

export interface OrderDetail extends LabTestPrices {
  uuid: number;
  abbreviation?: string;
  name?: string;
  price: number;
  secondary_price: number;
  discount: number;
}

export interface Order {
  id: number;
  code: string;
  user: string;
  cash_register: string;
  laboratory: {
    name: string;
    document:string;
    logo: string;
    address:string;
  };
  patient_number: number | null;
  keep_patient_number?: boolean;
  order_date: string;
  hour: string;
  main_currency: { id: number; code: string };
  secondary_currency: { id: number; code: string };
  tax?: { id: number; name: string, tax: number };
  patient: {
    id: number;
    full_name: string;
    cedula: string;
    gender: string;
    birthdate: string;
    phone_number?: string;
    address: string;
  };
  affiliation: { id: number; name: string, rif: string };
  exchange_rate: number;
  created_at?: string;
  delivery_date?: string;
  comment: string;
  discount?: number | null;
  main_total: number;
  amount_paid: number;
  secondary_total: number;
  cost_type: CostType;
  payment_type: PaymentType;
  status: Status;
  balance: number;
  detail: OrderDetail[];
  payments: PatientPayment[]
}

export type OrderFormValues = Pick<
  Order,
  | 'comment'
  | 'exchange_rate'
  | 'discount'
  | 'main_total'
  | 'secondary_total'
  | 'keep_patient_number'
  | 'patient_number'
  | 'cost_type'
  | 'status'
  | 'detail'
  | 'payment_type'
  | 'amount_paid'
> & {
  id?: number;
  tax?: number | null;
  main_currency: number | null;
  secondary_currency: number | null;
  patient: number | null;
  affiliation: number | null;
  order_date: Dayjs;
  amount_paid: number | null;
  delivery_date: Dayjs | null;
  status: Status;
  payments: PatientPaymentFormValues[]
};
