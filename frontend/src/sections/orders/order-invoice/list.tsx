//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useHasLaboratory } from '../../../hooks/use-has-laboratory';

import { BREADCRUMB_LIST_PAGE } from './context';

import GenerateOrderInvoice from './components/list/generate-order-invoice';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';

// ----------------------------------------------------------------------

export default function BillableOrderList() {
  useHasLaboratory();

  return (
    <Container component="section" maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={7}>
        <Box>
          <Typography variant="h4">Facturar Ordenes</Typography>
          <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
        </Box>
      </Stack> 
        <GenerateOrderInvoice />
    </Container>
  );
}
