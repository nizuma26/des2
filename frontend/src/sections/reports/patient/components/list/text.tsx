//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { PatientTreated } from '../../../../../types/reports/patients';

import { useGetData } from '../../../../../hooks/use-get-data';

import { TABLE_COLUMNS } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Iconify from '../../../../../components/iconify';
import Label from '../../../../../components/label';
import { fYear } from '../../../../../utils/format-time';

// ----------------------------------------------------------------------

export default function PatientTreatedTable() {
  const { data = [], isLoading } = useGetData({
    url: `api/reports/patient-treated/`,
    queryKey: ['patient-treated'],
    staleTime: 0,
  });

  const customCell = [
    {
      columnIndex: 3,
      render: (data: PatientTreated, rowIndex: number) => {
        const age = fYear(data.birthdate);
        return <Label color="success">{age}</Label>;
      },
    },
    {
      columnIndex: 5,
      render: (data: PatientTreated, rowIndex: number) => {
        data.gender === 'M' ? (
          <Label color="blue">Maculino</Label>
        ) : (
          <Label color="cyan">Femenino</Label>
        );
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
          Total de existencias
        </Box>
        <Box width={160}>{data?.total_stock}</Box>
      </Stack>
      <Stack direction="row" typography="subtitle2" gap={1}>
        <Box>Total de precios {'(VED)'} </Box>
        <Box width={160} maxWidth={1} color="secondary.main">
          {data?.total_price?.toFixed(2)}
        </Box>
      </Stack>
    </Stack>
  );

  const toolbarComponents = (
    <>
      <Button
        fullWidth
        variant="contained"
        sx={{ boxShadow: 'inherit', height: 50 }}
        startIcon={<Iconify icon="solar:printer-bold-duotone" />}
      >
        Imprimir PDF
      </Button>
    </>
  );

  return (
    <Card>
      <MuiDatatable
        data={data?.stocks}
        columns={TABLE_COLUMNS}
        loading={isLoading}
        options={{
          checkbox: false,
          filterFields: ['full_name', 'gender', 'birthdate', 'phone_number', ],
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
