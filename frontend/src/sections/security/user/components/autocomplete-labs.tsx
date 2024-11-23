import { useState } from 'react';
//@mui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { AutocompleteOptions } from '../../../../types';
import { User } from '../../../../types/security/user';

import { useGetData } from '../../../../hooks/use-get-data';

interface AutocompleteLabs {
  register: UseFormRegister<User>;
  errors: FieldErrors<User>;
  defaultValue?: number | string;
  handleChangeLaboratory: (id: number | null) => void;
}

interface options {
  id: number | null;
  code: string;
  name: string;
}

function AutocompleteLabs({
  register,
  errors,
  defaultValue = '',
  handleChangeLaboratory,
}: AutocompleteLabs) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleChange = (value: AutocompleteOptions | null) => {
    handleChangeLaboratory(value && value.id);
    const id = value ? value.id : '';
    setInputValue(id);
  };

  const { data, isLoading, isSuccess } = useGetData({
    url: 'api/config/laboratory/active_laboratories/',
    queryKey: ['active_laboratories'],
  });

  const options =  isSuccess 
  ? data.map((i: options) => {return { id: i.id, label: `${i.code}-${i.name}` }})
  : [];

  const isValue = inputValue ?  {shrink:true} : {}

  return (
      <Autocomplete
      value={
        inputValue
          ? options.find((selected: AutocompleteOptions) => {
              return inputValue === selected.id;
            }) ?? null
          : null
      }
      getOptionLabel={(option) => {
        return option.label;
      }}
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      isOptionEqualToValue={(option:AutocompleteOptions, value) => option?.label === value?.label}
      options={options}
      loading={isLoading}
      fullWidth
      {...register('laboratory', {
        required: 'Debe asignar un laboratorio al usuario',
      })}
      onChange={(event, newValue) => handleChange(newValue && newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Seleccione un Laboratorio"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          fullWidth
          error={!!errors.laboratory}
          helperText={errors.laboratory?.message}
          InputLabelProps={isValue}
        />
      )}
    />
  );
}

export default AutocompleteLabs;
