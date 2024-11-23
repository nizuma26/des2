//@mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useDialogStore, MuiDialog } from '../../../components/dialog';

import { BREADCRUMB_LIST_PAGE } from './context';

import ContainerTable from './components/list/container-table';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Iconify from '../../../components/iconify';
import ContainerFormDialog from './components/form/container-form-dialog';

// ----------------------------------------------------------------------

export default function ContainerList() {

  const showDialog = useDialogStore(state => state.showDialog)

  return (
    <Container component="section" maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Catálogo de Contenedores</Typography>
          <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
        </Box>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => showDialog(<ContainerFormDialog />)}
        >
          Nuevo contenedor
        </Button>
      </Stack>
      <Card>
        <ContainerTable />
      </Card>
      <MuiDialog />
    </Container>
  );
}
