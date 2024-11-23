import { ReactNode } from 'react';
//@mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Controller, Control, Path, FieldValues } from 'react-hook-form';

interface ControlledSwitchProps<TField extends FieldValues> {
  name: Path<TField>;
  label: ReactNode;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  control: Control<TField>;
}

const ControlledSwitch = <TField extends FieldValues>({
  name,
  label,
  labelPlacement='end',
  control,
}: ControlledSwitchProps<TField>) => {
  return (
    <FormControlLabel
      control={<Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }}) => (
            <Switch onChange={onChange} checked={value} />
        )}
      />}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
};

export default ControlledSwitch;
