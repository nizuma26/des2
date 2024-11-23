import { Control } from 'react-hook-form';

import { LabTestProfileFormValues } from '../../../../../types/configuration/lab-test-profile';

import { AutocompleteOptions } from '../../../../../components/controlled/types';
import { CostType } from '../../../../../types/configuration/lab-test';

export interface LabTestProfileFormProps {
  values: LabTestProfileFormValues;
  invalidateQuery: () => void;
}

export interface GeneralDataProps {
  values: LabTestProfileFormValues;
}

export interface LabTestCardProps {
  name: string;
  abbreviation: string;
  price: number;
  index:number;
  remove: (index:number) => void;
}

export interface SecondaryPriceProps {
  control: Control<LabTestProfileFormValues>;
  priceName: CostType;
  exchangeRate: number;
  currencyCode: string;
}

export interface DefaultAutocompleteProps <O extends AutocompleteOptions> {
  control: Control<LabTestProfileFormValues>;
  onSelected?: (data:O | null) => void;
}