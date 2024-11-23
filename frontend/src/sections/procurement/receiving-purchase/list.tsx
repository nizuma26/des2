import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { BREADCRUMB_ADD_PAGE } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ReceivingOrderTable from './components/list/receiving-purchase-table';

// ---------------------------------------------------------------

const ReceivingOrderList = () => (
  <Container maxWidth="xl" className="fade_down_animation">
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Box>
        <Typography variant="h4">Recepción de Compras</Typography>
        <Breadcrumb options={BREADCRUMB_ADD_PAGE} />
      </Box>
    </Stack>
    <ReceivingOrderTable />
  </Container>
);

export default ReceivingOrderList;
