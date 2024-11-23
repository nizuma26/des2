//@mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useDialogStore, MuiDialog } from '../../../components/dialog';

import { BREADCRUMB_LIST_PAGE } from './context';

import LabTestCategoryTable from './components/list/lab-test-category-table';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Iconify from '../../../components/iconify';
import LabTestCategoryFormDialog from './components/form/lab-test-category-form-dialog';

// ----------------------------------------------------------------------

export default function LabTestCategoryList() {

  const showDialog = useDialogStore(state => state.showDialog)

  return (
    <Container component="section" maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Catálogo de Categorías de Examenes</Typography>
          <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
        </Box>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => showDialog(<LabTestCategoryFormDialog />)}
        >
          Registrar Categoría
        </Button>
      </Stack>
      <Card>
        <LabTestCategoryTable />
      </Card>
      <MuiDialog />
    </Container>
  );
}
