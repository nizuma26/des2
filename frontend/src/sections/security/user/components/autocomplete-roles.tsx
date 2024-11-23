import { useState } from 'react';
//@mui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { useGetData } from '../../../../hooks/use-get-data';

import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { AutocompleteOptions } from '../../../../types';

import { User } from '../../../../types/security/user';


interface AutocompleteRoles {
  register: UseFormRegister<User>;
  errors: FieldErrors<User>;
  defaultValue?: number | string;
  handleChangeRole: (id: number | null) => void;
}

function AutocompleteRoles({
  register,
  errors,
  defaultValue = '',
  handleChangeRole,
}: AutocompleteRoles) {
  interface options {
    id: number | null;
    name: string;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleChange = (value: AutocompleteOptions | null) => {
    handleChangeRole(value && value.id);
    const id = value ? value.id : '';
    setInputValue(id);
  };

  const { data, isLoading, isSuccess } = useGetData({
    url: 'api/users/role/',
    queryKey: ['user_roles'],
  });

  const options =  isSuccess 
  ? data.map((i: options) => {return { id: i.id, label: `${i.id}-${i.name}` }})
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
      isOptionEqualToValue={(option: AutocompleteOptions, value) => option?.label === value?.label}
      options={options}
      loading={isLoading}
      fullWidth
      {...register('groups', {
        required: 'Debe asignar un rol al usuario',
      })}
      onChange={(event, newValue) => handleChange(newValue && newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Seleccione un Rol"
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
          error={!!errors.groups}
          helperText={errors.groups?.message}
          InputLabelProps={isValue}
        />
      )}
    />
  );
}

export default AutocompleteRoles;
