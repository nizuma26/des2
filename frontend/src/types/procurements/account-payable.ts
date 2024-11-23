import { Dayjs } from "dayjs";
import { Payment } from "../common/payment";

export interface AccountPayable {
  id: number;
  code: string;
  status: string;
  debt: number;
  balance: number;
  supplier: string;
  created_at: string;
  amount_paid: number;
  due_date: string;
}

export interface AccountPayable {
  id: number;
  code: string;
  status: string;
  debt: number;
  balance: number;
  supplier: string;
  order_date: string;
  due_date: string;
}

export interface AccountPayablePaymentList {
  id: number;
  payment_method: string;
  comment: string;
  payment: number | null;
  payment_ref: string;
  payment_date: string;
  created_at: string;
}

export type AccountPayablePaymentFormValues = Omit<Payment, 'payment_date' | 'payment_date' | 'created_at' | 'bank'> & {
  id?: number;
  bank: number | null;
  payment_date?: Dayjs
  account_payable: number | null;
}

export interface DebtSupplier {
  id: number;
  trade_name: string;
  rif: string;
  phone_number: string;
  total_debt: number;
}