import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { BREADCRUMB_LIST_PAGE } from './context';

import { RouterLink } from '../../../routes/components';
import Iconify from '../../../components/iconify';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import PurchaseRequisitionTable from './components/list/purchase-requisition-table';

// ----------------------------------------------------------------------

const PurchaseRequisitionList = () => (
  <Container maxWidth="xl" className="fade_down_animation">
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Box>
        <Typography variant="h4">Requisiciones de compra</Typography>
        <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
      </Box>
      <Button
        component={RouterLink}
        href="/purchase-requisition/add"
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Nueva requisición
      </Button>
    </Stack>
    <PurchaseRequisitionTable />
  </Container>
);

export default PurchaseRequisitionList;
