import { ReactNode, Ref, useState } from 'react';
//@mui
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { useSearch } from '../../hooks/use-search';

type BaseObject = Record<string, any>;

interface AutocompleteOptions {
  method?: 'GET' | 'POST';
  url: string;
  body?: object;
  delay?: number;
  minLength?: number;
}

interface AsyncAutocompleteProps <T extends BaseObject> {
  options: AutocompleteOptions;
  value?: BaseObject | null;
  onChange?: (value: T) => void;
  label?: string;
  placeholder?: string;
  getOptionLabel: (option: T) => string;
  clearOptions?: boolean;
  clearOnSelect?: boolean;
  adornement?: ReactNode;
  ref?: Ref<any>;
}

const DEFAULT_OPTIONS: AutocompleteOptions = {
  method: 'GET',
  url: '',
  body: {},
  delay: 300,
  minLength: 3,
};

function AsyncAutocomplete<T extends BaseObject>({
  options = DEFAULT_OPTIONS,
  onChange,
  label = 'Buscar...',
  placeholder = '',
  getOptionLabel,
  ref,
  clearOptions,
  clearOnSelect,
  adornement
}: AsyncAutocompleteProps<T>) {

  const [selected, setSelected] = useState(false)
  const [changeKey, setChangeKey] = useState(0)

  const { data=[], isLoading, hasError, autocomplete, setData } = useSearch({
    method: options?.method,
    url: options?.url,
    body: options?.body,
    delay: options?.delay,
    minLength: options?.minLength,
  });

  const handleChange = (value: T) => {
    if (value && onChange) {
      onChange(value);
      clearOptions && setData([])
      clearOnSelect && setChangeKey(changeKey+1)
    }
  };

  const onInputChange = (value: string) => {
    if (value?.length > 0 && value?.length < 2 ) setSelected(false)
    if (selected && value !== '') return

      autocomplete({ value });
  };

  return (
    <Autocomplete
      key={changeKey}
      disablePortal
      options={data}
      fullWidth
      getOptionLabel={(option) => getOptionLabel(option)}
      onChange={(event, value) => {
       if (value) {
        handleChange(value);
        setSelected(true);
       }
      }}
      loading={isLoading}
      blurOnSelect={'mouse'}
      onInputChange={(event, newInputValue) => {
        onInputChange(newInputValue);
      }}
      noOptionsText="Sin coincidencias"

      renderInput={(params) => (
        <TextField
          {...params}
          ref={ref}
          label={label}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                {params.InputProps.endAdornment}
                {adornement && adornement}
              </>
            ),
          }}
          fullWidth
          error={!!hasError}
          helperText={!!hasError && 'Error al cargar los datos'}
        />
      )}
    />
  );
}

export default AsyncAutocomplete;
