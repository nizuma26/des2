import { Control, Path, FieldValues, SetFieldValue } from 'react-hook-form';

import { LabTestType } from '../../../types/configuration/lab-test';
import { LabTest } from '../../../types/configuration/lab-test-profile';
import { ItemInventory } from '../../../types/inventory/item';
import { TypeTax } from '../../../types/configuration/tax';

export interface AutocompleteOptions {
  value: number | string;
  label: string;
}

export interface AutocompleteProps<TField extends FieldValues> {
  control: Control<TField>;
  defaultValue?: number | string;
  name: Path<TField>
  isRequired?: boolean;
  requireMessage?: string;
  size?: 'small' | 'medium';
  valueOptions?: string;
  onSelected?: (data: AutocompleteOptions | null) => void;
  buttonCreate?: boolean;
  onClickButton?: () => void;
}

export interface TaxSearchProps <TField extends FieldValues> extends AutocompleteProps<TField> {
  typeTax?: TypeTax
  setValue?: SetFieldValue<TField>
}

export interface LabTestSearchProps {
  labTestIds: number[];
  labTestType?: LabTestType
  addLabTest: (data: LabTest) => void
}

export interface ItemSearchProps {
  itemIds: number[];
  onSelected: (data:ItemInventory) => void;
}
