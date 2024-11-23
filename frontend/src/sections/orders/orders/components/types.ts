import { Control } from 'react-hook-form';
import { OrderDetail, OrderFormValues, Status } from '../../../../types/orders/orders';

export interface OrderFormProps {
  values: OrderFormValues;
  invalidateQuery: () => void;
}

export interface PopupOptionsProps {
  id: number;
  code: string;
  status: Status;
}

export interface PatientAutocompleteProps {
  control: Control<OrderFormValues>;
}

export interface PatientAgeProps {
  control: Control<OrderFormValues>;
}

export interface AffiliationAutocompleteProps {
  control: Control<OrderFormValues>;
  isEdit: boolean;
}

export interface LabTestAutocompleteProps {
  labTestIds: number[];
  addLabTest: (labTest: OrderDetail) => void;
}

export interface LabTest {
  id: number;
  abbreviation: string;
  name: string;
  price1: number;
}

export interface PatientInformationProps {
  control: Control<OrderFormValues>;
}

export interface BoxInfoProps {
  text?: string;
  defaultText?: string;
}

export interface InvoiceSummaryProps {
  mainCurrencyCode: string;
  secondaryCurrencyCode: string;
  exchangeRate: number;
}

export interface OrderDetailTableProps {
  mainCurrencyCode: string;
  secondaryCurrencyCode: string;
  exchangeRate: number;
}