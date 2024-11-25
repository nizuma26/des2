import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Theme } from '@mui/material';

import { Controller, Control, Path, FieldValues } from 'react-hook-form';

import dayjs from 'dayjs';

interface ControlledSelectProps<TField extends FieldValues> {
  name: Path<TField>;
  label?: string;
  isRequired?: boolean;
  size?: 'medium' | 'small';
  control: Control<TField>;
}

function ControlledDatePicker<TField extends FieldValues>({
  name,
  label='Fecha',
  isRequired = true,
  size='medium',
  control,
  ...other
}: ControlledSelectProps<TField>) {

  const sxStyle = {
    desktopPaper: {
      sx: {
        boxShadow: 'none',
      },
    },
    layout: {
      sx: {
        borderRadius: '12px',
        borderColor: '#2196f3',
        borderWidth: '1px',
        boxShadow: (theme:Theme) => theme.customShadows.paper,
        backgroundColor: 'background.paper',
      },
    },    
  };

  const rules = isRequired
    ? {
        required: 'la fecha es requerida'        
      }
    : {};

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label}
              views={['year', 'month', 'day']}
              onChange={onChange}
              value={value ? dayjs(value) : null}
              format="YYYY/MM/DD"
              slotProps={{ ...sxStyle,
                textField: {
                  error: !!error,
                  helperText: error?.message,
                  size: size,
                  fullWidth: true
                },
               }}
              {...other}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}

export default ControlledDatePicker;
