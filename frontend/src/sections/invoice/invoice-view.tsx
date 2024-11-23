import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from '../../routes/components';

import Iconify from '../../components/iconify';

import Breadcrumb from '../../components/breadcrumb/breadcrumb';
import InfoCard from '../../components/statistics-card/info-card';
import StatisticsCard from '../../components/statistics-card/statistics-card';
import InvoiceTable from './invoice-table';

import { options } from './context';

// ----------------------------------------------------------------------

export default function InvoicePage() {

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Ordenes</Typography>
          <Breadcrumb options={options} />
        </Box>
        <Link component={RouterLink} href="/user/add" sx={{ display: 'contents' }}>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill"/>}>
            Nueva Factura
          </Button>
        </Link>
      </Stack>

      <StatisticsCard>
        <InfoCard
          icon="solar:bill-list-bold-duotone"
          title="Total"
          body="20 facturas"
          cant="$26,229,06"
          sx={{ color: 'info.main' }}
          progressCircular={100}
        />
        <Divider orientation="vertical" sx={{ borderStyle: 'dashed' }} flexItem />
        <InfoCard
          icon="heroicons:document-check-solid"
          title="Pagadas"
          body="10 facturas"
          cant="$26,229,06"
          sx={{ color: 'success.main' }}
          progressCircular={50}
        />
        <Divider orientation="vertical" sx={{ borderStyle: 'dashed' }} flexItem />
        <InfoCard
          icon="solar:sort-by-time-bold"
          title="Pendientes"
          body="6 facturas"
          cant="$26,229,06"
          sx={{ color: '#FFA42D' }}
          progressCircular={30}
        />
        <Divider orientation="vertical" sx={{ borderStyle: 'dashed' }} flexItem />
        <InfoCard
          icon="solar:bell-bing-bold-duotone"
          title="Atrasadas"
          body="2 facturas"
          cant="$26,229,06"
          sx={{ color: 'danger.main' }}
          progressCircular={10}
        />
        <Divider orientation="vertical" sx={{ borderStyle: 'dashed' }} flexItem />
        <InfoCard
          icon="solar:bill-cross-bold-duotone"
          title="Inactivas"
          body="2 facturas"
          cant="$26,229,06"
          sx={{ color: 'text.secondary' }}
          progressCircular={10}
        />
      </StatisticsCard>

      <Card>
        <InvoiceTable />
      </Card>
    </Container>
  );
}
