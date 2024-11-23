import Stack from '@mui/material/Stack';

import { Dayjs } from 'dayjs';

import DateRangePicker from '../../components/date-picker';


interface DateRangeProps {
  setStartDate: (date:Dayjs | null) => void;
  setEndDate: (date:Dayjs | null) => void;
}

export default function DateRange({ setStartDate, setEndDate }:DateRangeProps) {
  
  return (
    <>
      <Stack maxWidth={1} direction={{ sm: 'column', md: 'row' }} minWidth={{ sm: 1, md: 500 }} gap={3}
      >
        <DateRangePicker name="start_date" label="Fecha inicial" onChange={(value) => setStartDate(value)} />
        <DateRangePicker name="end_date" label="Fecha final" onChange={(value) => setEndDate(value)} />
      </Stack>
    </>
  );
}
