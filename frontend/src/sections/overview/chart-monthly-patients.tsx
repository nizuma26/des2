import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import Chart, { useChart } from '../../components/chart';

import { QUERY_KEYS } from './context';

import { useGetData } from '../../hooks/use-get-data';

import Label from '../../components/label';
import { SvgIcon } from '../../components/svg-color';

// ----------------------------------------------------------------------

export default function ChartMonthlyPatients() {
  const { data = {}, isPending } = useGetData({
    url: '/api/reports/patients-treated-this-year/',
    queryKey: [QUERY_KEYS.MONTHLY_PATIENTS],
  });

  const series = [
    {
      name: 'Total de pacientes atendidos',
      type: 'column',
      fill: 'solid',
      data: data?.monthly_patients ?? [],
    },
  ];

  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: 'solid',
    },
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: any) => {
          if (typeof value !== 'undefined') {
            return value;
          }
          return value;
        },
      },
    },
  });

  const columnsSkeleton = Array.from({ length: 12 });

  const icon = (
    <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
      <SvgIcon icon="ic_chart_duotone" />
    </Label>
  );

  return (
    <Card>
      <CardHeader
        avatar={icon}
        title={
          <Typography variant="subtitle2" fontSize={16}>
            Pacientes atendidos durante el año
          </Typography>
        }
        sx={{
          background: 'none',
          boxShadow: 'none',
          color: 'inherit',
          p: 2,
          mt: 'inherit',
          mr: 'inherit',
          ml: 'inherit',
        }}
      />

      <Box sx={{ p: 3, pb: 1 }}>
        {isPending ? (
          <Box display="flex" flexDirection="row" height={364} gap={9} justifyContent="center">
            {columnsSkeleton.map((el, index) => (
              <Skeleton key={index} width={13} />
            ))}
          </Box>
        ) : (
          <Chart
            dir="ltr"
            type="line"
            series={series}
            options={chartOptions}
            width="100%"
            height={364}
          />
        )}
      </Box>
    </Card>
  );
}
