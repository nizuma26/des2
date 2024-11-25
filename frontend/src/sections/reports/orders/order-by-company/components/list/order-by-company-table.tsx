import { useState } from 'react';
//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { DateRangeData } from '../types';
import { OrderByCompany } from '../../../../../../types/reports/orders/order-by-company';

import { useGetData } from '../../../../../../hooks/use-get-data';
import useDateRange from '../../../../../../hooks/use-date-range';

import { QUERY_KEYS, TABLE_COLUMNS } from '../../context';

import MuiDatatable from '../../../../../../components/datatable/mui-datatable';
import DateRangePicker from '../../../../../../components/date-picker/date-range-picker';
import PrintPDF from '../document-pdf/print-pdf';
import AsyncAutocomplete from '../../../../../../components/async-autocomplete';

// ----------------------------------------------------------------------

export default function OrderByCompanyTable() {

  const [ company, setCompany ] = useState<string>('');

  const { dateRange, setDateRange } = useDateRange();

  const companyData = useGetData({
    url: `api/reports/order-by-company/?start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`,
    queryKey: [QUERY_KEYS.LIST, dateRange.startDate, dateRange.endDate],
  });
  
  const { data = [], isLoading } = useGetData({
    url: `api/reports/order-by-company/?company=${company}&start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`,
    queryKey: ['income-summary', dateRange.startDate, dateRange.endDate, company],
    enabled: !company
  });
  
  console.log(data);

  // const customCell = [
  //   {
  //     columnIndex: 0,
  //     render: (data: IncomeSummary, rowIndex: number) => (
  //       <Typography variant="body2" color="text.secondary">
  //         {rowIndex + 1}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     columnIndex: 3,
  //     render: (data: IncomeSummary, rowIndex: number) => (
  //       <>{data.invoice_number ?? 'Sin factura'}</>
  //     ),
  //   },
  //   {
  //     columnIndex: 4,
  //     render: (data: IncomeSummary, rowIndex: number) => <>{data.amount_paid.toFixed(2)}</>,
  //   },
  //   {
  //     columnIndex: 5,
  //     render: (data: IncomeSummary, rowIndex: number) => <>{data.total.toFixed(2)}</>,
  //   },
  //   {
  //     columnIndex: 6,
  //     render: (data: IncomeSummary, rowIndex: number) => {
  //       const balance = Number(data?.total) - Number(data?.amount_paid);
  //       return <>{balance?.toFixed(2)}</>;
  //     },
  //   },
  // ];

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
      <AsyncAutocomplete
        options={{
          method: 'GET',
          url: 'api/reports/order-by-company/',
          delay: 300,
          minLength: 3,
        }}
        getOptionLabel={(data) => data.name}
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
          filterFields: ['code', 'patient_full_name', 'patient_cedula'],
          pagination: false,
          dense: false,
        }}
        toolbarComponents={toolbarComponents}
        sx={{ inputStyle: { width: '100%' } }}
      />
      {summary}
    </Card>
  );
}
