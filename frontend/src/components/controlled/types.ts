import { ReactNode } from "react";

import { Control, FieldPath, FieldValues } from "react-hook-form";

export interface AutocompleteOptions {
    value: number | string;
    label: string;
}

export interface ControlledAutocompleteProps<
  TField extends FieldValues,
> {
  control: Control<TField>;
  name: FieldPath<TField>;
  options: AutocompleteOptions[];
  placeholder?: string;
  label?: string;
  isLoading?: boolean;
  isRequired?: boolean;
  size?: 'small' | 'medium'
  requiredMessage?: string;
  adornment?: ReactNode;
  onSelected?: (value:AutocompleteOptions | null) => void;
  onInputChange?: (value:string, reason:"input" | "reset" | "clear") => void;
  getOptionLabel?: (option: Record<string, any>) => string;
}