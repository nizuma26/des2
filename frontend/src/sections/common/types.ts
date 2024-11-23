import { Control, FieldValues } from 'react-hook-form';
import { BaseModalProps, GenericValues } from '../../types';
import { Currency } from '../../types/configuration/currency';

export interface AutocompleteProps<TField extends FieldValues> {
  control: Control<TField>;
}

export interface LaboratoryOptions {
  id: number;
  code: string;
  name: string;
}

export interface VoucherModalProps extends BaseModalProps {
  values?: GenericValues;
}

export interface CurrencyModalProps extends BaseModalProps {
  values?: Currency;
}

export interface PaymentModalProps extends BaseModalProps {
  totalBs: number;
  selectedCurrencyTotal: number;
  title: string;
  icon: string;
  isLoading?: boolean;
}