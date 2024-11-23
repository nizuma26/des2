import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';
import { DateRangeData } from './types';

import { today } from '../../utils/format-time';

import { SvgIcon } from '../svg-color';
import DatePicker from '../../components/date-picker';

// -----------------------------------------------

interface DateRangePickerProps {
  setDateRange: (dateRange: DateRangeData) => void;
  sx?: SxProps;
  sxProps?: { 
    textField?: SxProps;
    button?: SxProps;
  }
  buttonLabel?: string;
}

export default function DateRangePicker({ setDateRange, sxProps, buttonLabel="Buscar" }: DateRangePickerProps) {
  const date = today();
  const defaultValue = dayjs(date).format('YYYY-MM-DD');

  const [startDate, setStartDate] = useState<Dayjs | string>(defaultValue);
  const [endDate, setEndDate] = useState<Dayjs | string>(defaultValue);

  const handleClick = () => {
    const date = {
      startDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : '',
      endDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : '',
    };
    setDateRange(date);
  };

  return (
    <Stack width={1} direction={{xs: 'column', md: 'row'}} gap={3}>
        <Stack
          maxWidth={1}
          direction={{ sm: 'column', md: 'row' }}
          minWidth={{ sm: 1, md: 500 }}
          gap={3}
        >
          <DatePicker
            name="start_date"
            label="Fecha inicial"
            onChange={(value) => setStartDate(value ?? '')}
            sx={{...sxProps?.textField}}
          />
          <DatePicker
            name="end_date"
            label="Fecha final"
            onChange={(value) => setEndDate(value ?? '')}
            sx={{...sxProps?.textField}}
          />
        </Stack>
      <Button
        fullWidth
        variant="contained"
        color="inherit"
        sx={{ boxShadow: 'inherit',...sxProps?.button }}
        onClick={handleClick}
        startIcon={<SvgIcon icon="ic_search" />}
      >
        <Typography variant="subtitle2" noWrap>
          {buttonLabel}
        </Typography>
      </Button>
    </Stack>
  );
}
