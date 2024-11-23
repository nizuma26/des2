import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fNumber } from '../../utils/format-number';

import Chart, { useChart } from '../../components/chart';

import Label from '../../components/label';
import { SvgIcon } from '../../components/svg-color';
// ----------------------------------------------------------------------

interface AppConversionRatesProps {
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
    }[];
    options?: {
      chart: {
        toolbar: {
          show: false;
        };
      };
    };
  };
}

export default function AppConversionRates({ chart, ...other }: AppConversionRatesProps) {
  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '28%',
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: series.map((i) => i.label),
    },
    ...options,
  });

  const icon = (
    <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
      <SvgIcon icon="ic_chart_bar" />
    </Label>
  );

  return (
    <Card {...other}>
      <CardHeader
        avatar={icon}
        title={
          <Typography variant="subtitle2" fontSize={16} ml={0}>
            Ingresos del mes
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

      <Box sx={{ mx: 3, p: '20px 20px 20px 8px' }}>
        <Chart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}
