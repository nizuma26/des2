import { useState } from 'react';
//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import dayjs from 'dayjs';

import { DateRangeData } from '../types';
import { PatientTreated } from '../../../../../types/reports/patients';

import { useGetData } from '../../../../../hooks/use-get-data';
import { today } from '../../../../../utils/format-time';

import { TABLE_COLUMNS } from '../../context';
import { fYear } from '../../../../../utils/format-time';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import DateRangePicker from './date-range-picker';
import Iconify from '../../../../../components/iconify';
import Label from '../../../../../components/label';

// ----------------------------------------------------------------------

export default function PatientTreatedTable() {
  const date = today();
  const defaultValue = dayjs(date).format('YYYY-MM-DD');

  const [dateRange, setDateRange] = useState<DateRangeData>({
    startDate: defaultValue,
    endDate: defaultValue,
  });

  const { data = [], isLoading } = useGetData({
    url: `api/reports/patient-treated/?start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`,
    queryKey: ['patient-treated', dateRange.startDate, dateRange.endDate],
  });

  const customCell = [
    {
      columnIndex: 3,
      render: (data: PatientTreated, rowIndex: number) => {
        const age = fYear(data.birthdate);
        return (
          <Label color="success">
            {age[0]} {age[1]}
          </Label>
        );
      },
    },
    {
      columnIndex: 4,
      render: (data: PatientTreated, rowIndex: number) => {
        return data.gender === 'M' ? (
          <Label color="blue">Maculino</Label>
        ) : (
          <Label color="cyan">Femenino</Label>
        );
      },
    },
  ];

  const femalePatients = data?.patients?.filter(
    (patients: PatientTreated) => patients.gender === 'F'
  );
  const malePatients = data?.patients?.filter(
    (patients: PatientTreated) => patients.gender === 'M'
  );

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
            Total de Pacientes Atendidos:
          </Box>
          <Box>{data?.patients?.length}</Box>
        </Stack>
        <Stack direction="row" typography="subtitle2" gap={3}>
          <Box width={1} display="flex" flexDirection="row">
            Total de Pacientes Masculinos:
          </Box>
          <Box>{malePatients?.length}</Box>
        </Stack>
        <Stack direction="row" typography="subtitle2" gap={3}>
          <Box width={1} display="flex" flexDirection="row">
            Total de Pacientes Femeninos:
          </Box>
          <Box>{femalePatients?.length}</Box>
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
        startIcon={<Iconify icon="solar:printer-bold-duotone" />}
      >
        Imprimir PDF
      </Button>
    </Stack>
  );

  return (
    <Card>
      <MuiDatatable
        data={data?.patients}
        columns={TABLE_COLUMNS}
        loading={isLoading}
        options={{
          checkbox: false,
          filterFields: ['full_name', 'gender', 'birthdate', 'phone_number', 'order_date'],
          pagination: false,
          dense: false,
          search: false
        }}
        customCell={customCell}
        toolbarComponents={toolbarComponents}
        sx={{ inputStyle: { width: '100%' } }}
      />
      {summary}
    </Card>
  );
}
