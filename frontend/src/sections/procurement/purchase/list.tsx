import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { breadcrumbListPage } from './context';

import { RouterLink } from '../../../routes/components';
import Iconify from '../../../components/iconify';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import PurchaseTable from './components/list/purchase-table';

// ----------------------------------------------------------------------

const PurchaseList = () => (
  <Container maxWidth="xl" className="fade_down_animation">
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Box>
        <Typography variant="h4">Listado de ordenes de compras</Typography>
        <Breadcrumb options={breadcrumbListPage} />
      </Box>
      <Button
        component={RouterLink}
        href="/purchase/add"
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Nueva orden
      </Button>
    </Stack>
    <PurchaseTable />
  </Container>
);

export default PurchaseList;
