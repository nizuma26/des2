import { useState } from 'react';
//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import dayjs from 'dayjs';

import { DateRangeData } from '../types';
import { IncomeSummary } from '../../../../../types/reports/income-summary';

import { useGetData } from '../../../../../hooks/use-get-data';
import { today } from '../../../../../utils/format-time';

import { TABLE_COLUMNS } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import DateRangePicker from './date-range-picker';
import Iconify from '../../../../../components/iconify';
import PrintPDF from '../document-pdf/print-pdf';

// ----------------------------------------------------------------------

export default function IncomeSummaryTable() {
  const date = today();
  const defaultValue = dayjs(date).format('YYYY-MM-DD');

  const [dateRange, setDateRange] = useState<DateRangeData>({
    startDate: defaultValue,
    endDate: defaultValue,
  });

  
  const { data = [], isLoading } = useGetData({
    url: `api/reports/income-summary/?start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`,
    queryKey: ['income-summary', dateRange.startDate, dateRange.endDate],
  });
  
  console.log(data);

  const customCell = [
    {
      columnIndex: 0,
      render: (data: IncomeSummary, rowIndex: number) => (
        <Typography variant="body2" color="text.secondary">
          {rowIndex + 1}
        </Typography>
      ),
    },
    {
      columnIndex: 3,
      render: (data: IncomeSummary, rowIndex: number) => (
        <>{data.invoice_number ?? 'Sin factura'}</>
      ),
    },
    {
      columnIndex: 4,
      render: (data: IncomeSummary, rowIndex: number) => <>{data.total.toFixed(2)}</>,
    },
    {
      columnIndex: 5,
      render: (data: IncomeSummary, rowIndex: number) => <>{data.amount_paid.toFixed(2)}</>,
    },
    {
      columnIndex: 6,
      render: (data: IncomeSummary, rowIndex: number) => {
        const balance = Number(data?.total) - Number(data?.amount_paid);
        return <>{balance?.toFixed(2)}</>;
      },
    },
  ];

  const summary = (
    <Stack
      direction="column"
      gap={2}
      alignItems="flex-end"
      textAlign="right"
      p={3}
      overflow="hidden"
    >
      <Stack direction="row" typography="subtitle2" gap={1}>
        <Box maxWidth={1} alignItems="flex-start">
          Total
        </Box>
        <Box width={160}>{data?.total?.toFixed(2)}</Box>
      </Stack>
      <Stack direction="row" typography="subtitle2" gap={1}>
        <Box>Total abonado</Box>
        <Box width={160} maxWidth={1} color="error.main">
          {data?.amount_paid?.toFixed(2)}
        </Box>
      </Stack>
    </Stack>
  );

  const toolbarComponents = (
    <Stack direction="row" width={1} gap={3}>
      <DateRangePicker
        setDateRange={(dateRangeData: DateRangeData) => setDateRange({ ...dateRangeData })}
      />
      <PrintPDF data={data?.orders ?? []} laboratory={data?.laboratory} amountPaid={data?.amount_paid?.toFixed(2)} />
    </Stack>
  );

  return (
    <Card>
      <MuiDatatable
        data={data?.orders}
        columns={TABLE_COLUMNS}
        loading={isLoading}
        options={{
          checkbox: false,
          search: false,
          filterFields: ['order_code', 'invoice_number', 'patient'],
          pagination: false,
          dense: false,
        }}
        customCell={customCell}
        toolbarComponents={toolbarComponents}
        sx={{ inputStyle: { width: '100%' } }}
      />
      {summary}
    </Card>
  );
}
