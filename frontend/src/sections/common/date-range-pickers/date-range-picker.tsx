import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import dayjs, { Dayjs } from 'dayjs';
import { DateRangeData } from './types';

import { today } from '../../../utils/format-time';

import Iconify from '../../../components/iconify';
import DatePicker from '../../../components/date-picker';

// -----------------------------------------------

interface DateRangePickersProps {
  setDateRange: (dateRange: DateRangeData) => void;
}

export default function DateRangePickers({ setDateRange }: DateRangePickersProps) {
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
    <Stack direction="row" gap={3}>
      <>
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
          />
          <DatePicker
            name="end_date"
            label="Fecha final"
            onChange={(value) => setEndDate(value ?? '')}
          />
        </Stack>
      </>
      <Button
        variant="contained"
        color='inherit'
        sx={{ boxShadow: 'inherit', height: 50 }}
        fullWidth
        onClick={handleClick}
        startIcon={<Iconify icon="ic:round-filter-list" />}
      >
        Filtrar
      </Button>
    </Stack>
  );
}
