import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { BREADCRUMB_ADD_PAGE } from './context';

import { RouterLink } from '../../../routes/components';
import Iconify from '../../../components/iconify';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import PurchaseOrderTable from './components/list/purchase-order-table';

const PurchaseOrderList = () => (
  <Container maxWidth="xl" className="fade_down_animation">
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Box>
        <Typography variant="h4">Ordenes de compras</Typography>
        <Breadcrumb options={BREADCRUMB_ADD_PAGE} />
      </Box>
      <Button
        component={RouterLink}
        href="/purchase-order/add"
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Nueva orden de compra
      </Button>
    </Stack>
    <Card>
      <PurchaseOrderTable />
    </Card>
  </Container>
);

export default PurchaseOrderList