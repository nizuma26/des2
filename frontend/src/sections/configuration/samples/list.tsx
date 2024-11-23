//@mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useDialogStore, MuiDialog } from '../../../components/dialog';

import { BREADCRUMB_LIST_PAGE } from './context';

import SampleTable from './components/list/sample-table';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { SvgIcon } from '../../../components/svg-color';
import SampleFormDialog from './components/form/sample-form-dialog';

// ----------------------------------------------------------------------

export default function SampleList() {

  const showDialog = useDialogStore(state => state.showDialog)

  return (
    <Container component="section" maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Listado de Tipos de Muestras</Typography>
          <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
        </Box>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<SvgIcon icon="ic_add" />}
          onClick={() => showDialog(<SampleFormDialog />)}
        >
          Nuevo Tipo de Muestra
        </Button>
      </Stack>
      <Card>
        <SampleTable />
      </Card>
      <MuiDialog />
    </Container>
  );
}
