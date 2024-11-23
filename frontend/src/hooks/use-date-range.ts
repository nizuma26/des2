import { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import { today } from '../utils/format-time';

// -------------------------------------------------

export interface DateRangeData {
  startDate: Dayjs | string;
  endDate: Dayjs | string;
}

export interface useDateRangeProps {
  initialDateRange?: 'current' | '';
}

export default function useDateRange() {

  const date = today();
  const defaultValue = '';
  //const defaultValue = initialDateRange === 'current' ? dayjs(date).format('YYYY-MM-DD') : '';

  const [dateRange, setDateRange] = useState<DateRangeData>({
    startDate: defaultValue,
    endDate: defaultValue,
  });

  return {
    dateRange,
    setDateRange
  }
}
