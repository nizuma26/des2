//@mui
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { Controller } from 'react-hook-form';

import { ParamOptionsProps } from './types';
import Chip from '@mui/material/Chip';

export default function ParameterOptions({ control }: ParamOptionsProps) {

  return (
    <>
      <Controller
        control={control}
        name="options"
        rules={{ required: 'Debe agregar al menos una opción' }}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value } = field;
          const defaultValue = !!value?.length ? value : [];
          return (
            <Autocomplete
              multiple
              id="tags-filled"
              options={defaultValue}
              value={defaultValue}
              freeSolo
              onChange={(event, newValue) => onChange(newValue ? newValue : null)}
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return <Chip variant="outlined" label={option} key={key} {...tagProps} />;
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Opciones"
                  placeholder="Escriba una opción y presiones Enter para agregarla..."
                  error={!!error}
                  helperText={<>{error?.message}</>}
                />
              )}
            />
          );
        }}
      />
    </>
  );
}
