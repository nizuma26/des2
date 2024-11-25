import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { BREADCRUMB_LIST_PAGE } from './context';

import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import ProcessedLabTestTable from './components/list/processed-lab-test-table';

// ----------------------------------------------------------------------

const ProcessedLabTestReport = () => (
  <Container maxWidth="xl" className="fade_down_animation">
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Box>
        <Typography variant="h4">Examenes Procesados</Typography>
        <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
      </Box>
    </Stack>
    <ProcessedLabTestTable />
  </Container>
);

export default ProcessedLabTestReport;
