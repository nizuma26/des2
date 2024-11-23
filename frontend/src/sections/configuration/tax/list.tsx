//@mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useDialogStore, MuiDialog } from '../../../components/dialog';

import { BREADCRUMB_LIST_PAGE } from './context';

import TaxTable from './components/list/tax-table';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Iconify from '../../../components/iconify';
import TaxFormDialog from './components/form/tax-form-dialog';

// ----------------------------------------------------------------------

export default function TaxList() {

  const showDialog = useDialogStore(state => state.showDialog)

  return (
    <Container component="section" maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Listado de impuestos</Typography>
          <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
        </Box>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => showDialog(<TaxFormDialog />)}
        >
          Nuevo impuesto
        </Button>
      </Stack>
      <Card>
        <TaxTable />
      </Card>
      <MuiDialog />
    </Container>
  );
}
