import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { SxProps, Theme } from '@mui/material';

import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { today } from '../../utils/format-time';

interface DateRangePickerProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  size?: 'medium' | 'small';
  sx?: SxProps;
  onChange?: (value: Dayjs | null) => void;
}

export default function DatePicker({
  name,
  label = 'Fecha',
  size = 'medium',
  onChange,
  sx,
  ...other
}: DateRangePickerProps) {
  const date = today();
  const defaultValue = dayjs(date);

  const [error, setError] = useState('');

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        defaultValue={null}
        name={name}
        label={label}
        views={['year', 'month', 'day']}
        format="YYYY/MM/DD"
        slotProps={{
          ...sxStyle,
          textField: {
            error: !!error,
            helperText: error,
            size: size,
            fullWidth: true,
            sx: {
              ...sx
            },
          },
        }}
        onChange={(newValue) => {
          const value = dayjs(newValue);
          onChange && onChange(value);
        }}
        {...other}
      />
    </LocalizationProvider>
  );
}
