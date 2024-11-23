import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';

import { CostType, LabTestFormValues, Parameter, LabTestItems } from '../../../../../types/configuration/lab-test';

import { AutocompleteOptions } from '../../../../../components/controlled/types';
import { BaseModalProps } from '../../../../../types';

export interface LabTestFormProps {
  values: LabTestFormValues;
  invalidateQuery: () => void;
}

export interface GeneralDataProps {
  values: LabTestFormValues;
}

export interface ParamProps {
  name: string;
  type: string;
  measure_unit: string;
  paramOptions: string[];
  index: number;  
}

export interface ReferenceValuesDialogProps {
  index: number;
  parameterName: string;
  control: Control<LabTestFormValues>;
}

export interface SubParameterDialogProps {
  index: number;
  parameterName: string;
  control: Control<LabTestFormValues>;
}

export interface ParamOptionsProps {
  index?: number;
  control: Control<Parameter>;
}

export interface ItemCardProps {
  name: string;
  code: string;
  image?: string;
  quantity: number;
  index:number;
  control: Control<LabTestItems>;
  register: UseFormRegister<LabTestFormValues>;
  errors: FieldErrors<LabTestFormValues>;
  remove: (index:number) => void;
}

export interface SecondaryPriceProps {
  control: Control<LabTestFormValues>;
  priceName: CostType;
  exchangeRate: number;
  currencyCode: string;
}

export interface DefaultAutocompleteProps <O extends AutocompleteOptions> {
  control: Control<LabTestFormValues>;
  onSelected?: (data:O | null) => void;
}

export interface ParameterDialogProps extends BaseModalProps {
  defaultValue?: Parameter;
  addOrUpdate: (data:Parameter, index?: number) => void;
  index?: number;
}