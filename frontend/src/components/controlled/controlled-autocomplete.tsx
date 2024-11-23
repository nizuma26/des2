import { useState } from 'react';
//@mui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { Controller, FieldValues } from 'react-hook-form';
import { AutocompleteOptions, ControlledAutocompleteProps } from './types';

//-----------------------------------------

const ControlledAutocomplete = <TField extends FieldValues>({
  control,
  name,
  options,
  placeholder = '',
  label = 'field',
  isLoading = false,
  isRequired = true,
  requiredMessage = 'Este campo es requerido',
  size = 'medium',
  adornment,
  onSelected,
  onInputChange,
}: ControlledAutocompleteProps<TField>) => {

  const [isSelected, setSelected] = useState(false)
  
  const rules = isRequired
    ? {
        required: requiredMessage,
      }
    : {};

  const handleInputChange = (value: string, reason: "input" | "reset" | "clear") => {
    if (value?.length > 0 && value?.length < 2) setSelected(false);
    if (isSelected && value !== '') return;

    onInputChange && onInputChange(value, reason)
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        const isValue = value ? { shrink: true } : {};
        const handleChange = (newValue: AutocompleteOptions | null) => {
          onChange(newValue?.value ?? null);
          onSelected && onSelected(newValue);
          setSelected(newValue !== null)
        };
        return (
          <>
            <Autocomplete
              value={
                value
                  ? (options.find((option) => {
                      return value === option.value;
                    }) ?? null)
                  : null
                }
                options={options}
              getOptionLabel={(option) => {
                return option.label;
              }}
              size={size}
              loading={isLoading}
              noOptionsText="Sin coincidencias"
              fullWidth
              onChange={(event, newValue, reason) => {
                reason === "clear" 
                ? handleChange( null)
                : handleChange(newValue)
              }}
              onInputChange={(event, value, reason) => {handleInputChange(value, reason)}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  size={size}
                  inputRef={ref}
                  placeholder={placeholder}
                  InputProps={{
                    ...params.InputProps,
                    style: { paddingTop: '9px', paddingBottom: '9px' },
                    endAdornment: (
                      <>
                        {adornment && adornment}
                        {params.InputProps.endAdornment}
                        {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                      </>
                    ),
                  }}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  InputLabelProps={isValue}
                />
              )}
            />
          </>
        );
      }}
    />
  );
};

export default ControlledAutocomplete;
