import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import dayjs, { Dayjs } from 'dayjs';
import { DateRangeData } from '../types';

import { today } from '../../../../../utils/format-time';

import DateRange from '../../../../common/date-ranger-picker';
import Iconify from '../../../../../components/iconify';

// -----------------------------------------------

interface DateRangePickerProps {
  setDateRange: (dateRange: DateRangeData) => void;
}

function DateRangePicker({ setDateRange }: DateRangePickerProps) {
  const date = today()
  const defaultValue = dayjs(date).format('YYYY-MM-DD')

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
    <Stack width={1} direction="row" gap={3}>
      <DateRange
        setStartDate={(date) => setStartDate(date ?? '')}
        setEndDate={(date) => setEndDate(date ?? '')}
      />
      <Button
        variant="contained"
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

export default DateRangePicker;
