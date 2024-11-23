import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { BREADCRUMB_LIST_PAGE } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import IncomeSummaryTable from './components/list/income-summary-table';

// ----------------------------------------------------------------------

const IncomeSummaryReport = () => (
  <Container maxWidth="xl" className="fade_down_animation">
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Box>
        <Typography variant="h4">Resumen de Ingresos</Typography>
        <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
      </Box>
    </Stack>
    <IncomeSummaryTable />
  </Container>
);

export default IncomeSummaryReport;
