import { Control, FieldValues } from 'react-hook-form';

export interface SupplierAutocompleteProps<TField extends FieldValues> {
  control: Control<TField>;
}

export interface SupplierOptions {
  id: number;
  trade_name: string;
  rif: string;
}
