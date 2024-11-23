import { Control, UseFormGetValues } from 'react-hook-form';
import { BaseModalProps } from '../../../../../types';
import { Patient, PatientAffiliation } from '../../../../../types/orders/patients';
import { PatientFormProps } from '../../../patients/components/types';
import { OrderFormValues } from '../../../../../types/orders/orders';

export interface PatientSearchProps {
  setPatientId: (id: number | null) => void;
  setPatientNumber: (patientNumber: number) => void;
  control: Control<OrderFormValues>;
}

type PatientDialog = Omit<BaseModalProps, 'onSubmit'>;

export interface CreatePatientDialogProps extends PatientFormProps, PatientDialog {
  onSubmit: (data: Patient, action: 'edit' | 'add') => void;
}

export interface AffiliationSearchProps {
  control: Control<OrderFormValues>;
  onSelected?: (data: PatientAffiliation | null) => void;
  isRequired?: boolean;
  size?: 'small' | 'medium';
}

export interface PaymentOrderDialogProps extends BaseModalProps {
  formValues: UseFormGetValues<OrderFormValues>;
  mainCurrencyCode: string;
  secondaryCurrencyCode: string;
  control: Control<OrderFormValues>;
  loading: boolean;
  setPaymentAmount: (amount: number) => void;
}

export interface PaymentTableProps {
  orderId: number;
  hasDebt: boolean;
}

export interface ApplyDiscountDialogProps {
  applyDiscount: (
    discount: number,
    selected: number[],
    setCheckAll: (checked: boolean) => void
  ) => void;
  selected: number[];
  setCheckAll: (checked: boolean) => void;
}
