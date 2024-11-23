import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import { fNumber } from '../../utils/format-number';

import Chart, { useChart } from '../../components/chart';

import { QUERY_KEYS } from './context';

import { useGetData } from '../.././hooks/use-get-data';

import Label from '../../components/label';
import { SvgIcon } from '../../components/svg-color';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 380;

const LEGEND_HEIGHT = 90;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

interface TopLabTests {
  lab_test__name: string;
  total_requests: number;
}

export default function AppCurrentVisits() {
  const theme = useTheme();

  const { data = {}, isPending } = useGetData({
    url: '/api/reports/top-lab-tests/',
    queryKey: [QUERY_KEYS.TOP_LAB_TESTS],
  });

  const chartSeries = data?.top_tests?.map((i: TopLabTests) => i?.total_requests) ?? [];

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    labels: data?.top_tests?.map((i: TopLabTests) => i?.lab_test__name) ?? [],
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: (seriesName: string) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
  });

  const icon = (
    <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
      <SvgIcon icon="ic_pie_chart" />
    </Label>
  );

  return (
    <Card>
      <CardHeader
        avatar={icon}
        title={
          <Typography variant="subtitle2" fontSize={16} ml={0}>
            Examenes mas solicitados del mes
          </Typography>
        }
        sx={{ background: 'none', boxShadow: 'none', color: 'inherit', p: 2, mt: 'inherit', mr: 'inherit', ml: 'inherit' }}
      
      />
      <StyledChart
        dir="ltr"
        type="pie"
        series={chartSeries}
        options={chartOptions}
        width="100%"
        height={280}
      />
    </Card>
  );
}
