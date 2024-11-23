//@mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { BREADCRUMB_LIST_PAGE } from './context';

import LabTestTable from './components/list/lab-test-table';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { RouterLink } from '../../../routes/components';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LabTestList() {
  return (
    <Container component="section" maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Listado de examenes</Typography>
          <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
        </Box>
        <Button
          href="/lab-test/add"
          component={RouterLink}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Nuevo examen
        </Button>
      </Stack>
      <Card>
        <LabTestTable />
      </Card>
    </Container>
  );
}
