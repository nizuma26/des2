import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { BREADCRUMB_PENDING_REQUISITION_PAGE } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import PendingRequisitionTable from './components/list/pending-requisition-table';

// ----------------------------------------------------------------------

const PurchaseRequisitionList = () => (
  <Container maxWidth="xl" className="fade_down_animation">
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Box>
        <Typography variant="h4">Requisiciones pendientes</Typography>
        <Breadcrumb options={BREADCRUMB_PENDING_REQUISITION_PAGE} />
      </Box>
    </Stack>
    <PendingRequisitionTable />
  </Container>
);

export default PurchaseRequisitionList;
