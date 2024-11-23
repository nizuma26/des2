//@mui
import { SxProps } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import { Controller, Control, Path, FieldValues } from 'react-hook-form';

interface Options {
  value: string | number | null;
  label: string | null;
}

interface ControlledSelectProps<O extends Options, TField extends FieldValues> {
  name: Path<TField>;
  label: string;
  options: O[];
  control: Control<TField>;
  defaultValue?: string | number;
  size?: 'small' | 'normal';
  onSelected?: (data:Options['value']) => void;
  sx?: SxProps;
  isRequired?: boolean;
}

const ControlledSelect = <O extends Options, TField extends FieldValues>({
  name,
  label,
  options,
  control,
  defaultValue = '',
  size = 'normal',
  onSelected,
  sx,
  isRequired=true
}: ControlledSelectProps<O, TField>) => {

  const rules = isRequired ? { required: 'Debe seleccionar una opción' } : {}

  const generateOptions = () => {
    if (!options.length)
      return (
        <MenuItem value="">
          <em>Sin opciones</em>
        </MenuItem>
      );
    return options.map((option: Options) => {
      const checkValue = option?.value ?? ''
      const value = `value-${checkValue}`
      return (
        <MenuItem key={value} value={checkValue}>
          {option.label}
        </MenuItem>
      );
    });
  };
  const paddingInput = size === 'small' ? '12px' : '16px'
  const styleInput = {
    '& .MuiInputBase-input': {
      p: paddingInput,
    },
  };

  const isDefaultValue = defaultValue !== null && defaultValue !== undefined && defaultValue !== '';

  const isValue = isDefaultValue ? true : undefined;

  const sizeSelect = size === 'normal' ? 'medium' : 'small'

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const newValue = value ? value : '';
          onSelected && onSelected(value)

          console.log('VALUE: ', newValue)
          return (
            <>
              <InputLabel size={size} error={!!error} shrink={isValue}>
                {label}
              </InputLabel>
              <Select
                onChange={onChange}
                defaultValue={defaultValue}
                value={newValue}
                label={label}
                error={!!error}
                size={sizeSelect}
                sx={{ ...sx, ...styleInput }}
              >
                {generateOptions()}
              </Select>
              {!!error && <FormHelperText error={true}>{error?.message}</FormHelperText>}
            </>
          );
        }}
      />
    </FormControl>
  );
};

export default ControlledSelect;
