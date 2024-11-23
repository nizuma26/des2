import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { BREADCRUMB_LIST_PAGE } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import PatientTreatedTable from './components/list/patient-treated-table';

// ----------------------------------------------------------------------

const PatientTreatedReport = () => (
  <Container maxWidth="xl" className="fade_down_animation">
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Box>
        <Typography variant="h4">Reporte de Pacientes Atendidos</Typography>
        <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
      </Box>
    </Stack>
    <PatientTreatedTable />
  </Container>
);

export default PatientTreatedReport;
