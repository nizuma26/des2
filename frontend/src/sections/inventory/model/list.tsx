//@mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { BREADCRUMB_LIST_PAGE } from './context';

import { MuiDialog, useDialogStore } from '../../../components/dialog';
import { SvgIcon } from '../../../components/svg-color';
import ModelTable from './components/model-table';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ModelFormDialog from './components/model-form-dialog';

// ----------------------------------------------------------------------

export default function ModelList() {
  
  const showDialog = useDialogStore((state) => state.showDialog);

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Listado de Modelos</Typography>
          <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
        </Box>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<SvgIcon icon="ic_add" />}
          onClick={() => showDialog(<ModelFormDialog />, 'xs')}
        >
          Nuevo Registro
        </Button>
      </Stack>
      <Card>
        <ModelTable />
      </Card>
      <MuiDialog />
    </Container>
  );
}
