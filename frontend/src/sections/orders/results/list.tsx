//@mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useHasLaboratory } from '../../../hooks/use-has-laboratory';

import { BREADCRUMB_LIST_PAGE } from './context';

import PendingOrderTable from './components/list/pending-order-table';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';

// ----------------------------------------------------------------------

export default function PendingOrderList() {
  useHasLaboratory();

  return (
    <Container component="section" maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Captura de Resultados</Typography>
          <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
        </Box>
      </Stack>
      <Card>
        <CardHeader
          title="Ordenes Pendientes"          
          sx={{
            color: '#fff',
            mb: 4
          }}
        />
        <PendingOrderTable />
      </Card>
    </Container>
  );
}
