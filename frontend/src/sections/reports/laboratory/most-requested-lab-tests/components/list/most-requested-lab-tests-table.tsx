//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { DateRangeData } from '../../../../../../components/date-picker/types';
import { MostRequestedLabTests } from '../../../../../../types/reports/laboratory/most-requested-lab-tests';

import { useGetData } from '../../../../../../hooks/use-get-data';
import useDateRange from '../../../../../../hooks/use-date-range';

import { QUERY_KEYS, TABLE_COLUMNS } from '../../context';

import MuiDatatable from '../../../../../../components/datatable/mui-datatable';
import DateRangePicker from '../../../../../../components/date-picker/date-range-picker';
import { SvgIcon } from '../../../../../../components/svg-color';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

export default function MostRequestedLabTestsTable() {
  const { dateRange, setDateRange } = useDateRange();

  const { data = [], isPending } = useGetData({
    url: `api/reports/most-requested-lab-test/?start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`,
    queryKey: [QUERY_KEYS.LIST, dateRange.startDate, dateRange.endDate],
  });

  const totalRequest = useMemo(() => data?.lab_tests?.reduce(
    (previousValue: number, currentValue: MostRequestedLabTests) =>
      previousValue + Number(currentValue?.total_requests),
    0
  ), [data]);

  const summary = (
    <Stack direction="column" alignItems="flex-end" py={2} px={1} maxWidth={1}>
      <Stack
        borderRadius="16px"
        bgcolor="rgba(145, 158, 171, 0.05)"
        border="1px dashed rgba(145, 158, 171, 0.2)"
        px={2}
        py={1}
        gap={1}
      >
        <Stack direction="row" typography="subtitle2" gap={3}>
          <Box width={1} display="flex" flexDirection="row">
            Total solicitados:
          </Box>
          <Box>{totalRequest}</Box>
        </Stack>
      </Stack>
    </Stack>
  );

  const toolbarComponents = (
    <Stack direction="row" width={1} gap={3}>
      <DateRangePicker
        setDateRange={(dateRangeData: DateRangeData) => setDateRange({ ...dateRangeData })}
      />
      <Button
        variant="contained"
        sx={{ boxShadow: 'inherit', height: 50, width: '30%' }}
        startIcon={<SvgIcon icon="ic_printer" />}
      >
        <Typography variant="subtitle2" noWrap>
          Imprimir PDF
        </Typography>
      </Button>
    </Stack>
  );

  return (
    <Card>
      <MuiDatatable
        data={data?.lab_tests}
        columns={TABLE_COLUMNS}
        loading={isPending}
        options={{
          checkbox: false,
          search: true,
          filterFields: ['name', 'category'],
          pagination: false,
          dense: false,
          key: 'uuid'
        }}
        toolbarComponents={toolbarComponents}
        sx={{ inputStyle: { width: '100%' } }}
      />
      {summary}
    </Card>
  );
}
