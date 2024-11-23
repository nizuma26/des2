import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from '../../../theme/css';
import { QUERY_KEYS } from '../context';

import ChartTopLabTests from '../chart-top-lab-tests';
import ChartMonthlyPatients from '../chart-monthly-patients';
import AppWidgetSummary from '../app-widget-summary';
import AppConversionRates from '../app-conversion-rates';
import { useGetData } from '../../../hooks/use-get-data';

// ----------------------------------------------------------------------

export default function AppView() {

  const { palette } = useTheme();

  const {data: widget={}, isPending} = useGetData({
    url: '/api/reports/widget-summary/',
    queryKey: [QUERY_KEYS.WIDGET_SUMMARY]
  })

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        sx={{
          mb: 5,
        }}
      >
        Panel Principal
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            sx={{
              color: 'blue.darker',
              background: palette.info.gradient
            }}
            label="Pacientes atendidos hoy"
            value={widget?.patients_treated_today}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            loading={isPending}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            sx={{ color: 'success.darker', background: palette.success.gradient }}
            label="Ganancias de hoy"
            value={widget?.today_earnings}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            loading={isPending}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            sx={{ color: '#7a4100', background: palette.warning.gradient }}
            label="Ordenes registradas"
            value={widget?.patients_treated_today}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            loading={isPending}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            sx={{ color: 'error.darker', background: palette.error.gradient }}
            label="Cuentas por cobrar"
            value={widget?.accounts_receivable}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            loading={isPending}
          />
        </Grid>

        <Grid xs={12} md={5}>
          <ChartTopLabTests/>
        </Grid>

        <Grid xs={12} md={7}>
          <ChartMonthlyPatients />          
        </Grid>
        <Grid xs={12}>
        <AppConversionRates
            chart={{
              series: [
                { label: 'Miguel', value: 400 },
                { label: 'Maria', value: 430 },
                { label: 'Jose', value: 448 },
                { label: 'Pedro', value: 470 },
                { label: 'Juan', value: 540 },
                { label: 'Karla', value: 580 },
                { label: 'John', value: 900 },
              ],
            }}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
