import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { Controller } from 'react-hook-form';

import { AffiliationAutocompleteProps } from '../types';
import { Affiliation } from '../../../../../types/orders/affiliations';

import { useGetData } from '../../../../../hooks/use-get-data';

import { QUERY_KEYS } from '../../../affiliations/context';

export default function AffiliationAutocomplete({ control, isEdit }: AffiliationAutocompleteProps) {
  const { data = [], isLoading } = useGetData({
    url: '/api/orders/affiliation/',
    queryKey: [QUERY_KEYS.list],
  });

  const options = data.map((option: Affiliation) => {
    return { id: option.id, name: option.name };
  });

  return (
    <Controller
      control={control}
      name="affiliations"
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        const isValue = value ? { shrink: true } : {};
        const defaultValue = !!value?.length && isEdit ? value : [];
        return (
          <>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={options}
              disableCloseOnSelect
              defaultValue={[...defaultValue]}
              getOptionLabel={(option: { id: number; name: string }) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              loading={isLoading}
              fullWidth
              onChange={(event, newValue) => onChange(newValue ? newValue : null)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Asignar Afiliaciones"
                  placeholder="Seleccionados"
                  inputRef={ref}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {params.InputProps.endAdornment}
                        {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                      </>
                    ),
                  }}
                  fullWidth
                  error={!!error}
                  helperText={<>{error?.message}</>}
                  InputLabelProps={isValue}
                />
              )}
            />
          </>
        );
      }}
    />
  );
}
