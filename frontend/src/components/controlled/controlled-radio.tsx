//@mui
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import RadioGroup from '@mui/material/RadioGroup';

import { Controller, Control, Path, FieldValues } from 'react-hook-form';

export interface OptionsRadioButton {
  value: number | string;
  label: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

export interface ControlledRadioProps<TField extends FieldValues> {
  name: Path<TField>;
  options: OptionsRadioButton[];
  isRequired?: boolean;
  requiredMessage?: string;
  control: Control<TField>;
  row?: boolean;
}

const ControlledRadio = <TField extends FieldValues>({
  name,
  options,
  isRequired = true,
  requiredMessage = 'Debe seleccionar una opción',
  control,
  row=false
}: ControlledRadioProps<TField>) => {
  const rules = isRequired
    ? {
        required: requiredMessage,
      }
    : {};
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <RadioGroup          
            row={row}
            aria-labelledby="controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={onChange}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
                labelPlacement={option.labelPlacement ?? 'end'}
              />
            ))}
          </RadioGroup>
          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </>
      )}
    />
  );
};

export default ControlledRadio;
