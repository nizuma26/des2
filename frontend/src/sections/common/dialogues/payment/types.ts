import { Control } from 'react-hook-form';

import { PatientPaymentFormValues, PaymentType } from '../../../../types/orders/payments';
import { BaseModalProps } from '../../../../types';

export interface PaymentToggleButtonsProps {
  control: Control<PatientPaymentFormValues>;
}

export interface PaymentDialogProps extends BaseModalProps {
  orderId: number;
  balance: number;
  secondaryTotal: number;
  mainCurrencyCode: string;
  secondaryCurrencyCode: string;
  orderCode: string;
  paymentType: PaymentType;
}

export interface PaymentTableProps {
  orderId: number;
  hasDebt: boolean;
}