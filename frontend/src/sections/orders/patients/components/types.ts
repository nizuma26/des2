import { Control } from 'react-hook-form';
import { PatientFormValues } from '../../../../types/orders/patients';

export interface PatientFormProps {
  values: PatientFormValues;
  invalidateQuery: () => void;
}

export interface PopupOptionsProps {
  id: number;
  patient: string;
}

export interface PatientAgeProps {
  control: Control<PatientFormValues>;
}
export interface AffiliationAutocompleteProps {
  control: Control<PatientFormValues>;
  isEdit: boolean;
}