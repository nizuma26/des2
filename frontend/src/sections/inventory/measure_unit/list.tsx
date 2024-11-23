//@mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { breadcrumbListPage } from './context';

import { MuiDialog, useDialogStore } from '../../../components/dialog';
import MeasureUnitTable from './components/measure-unit-table';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import MeasureUnitFormDialog from './components/measure-unit-form-dialog';
import { SvgIcon } from '../../../components/svg-color';

// ----------------------------------------------------------------------

export default function MeasureUnitList() {

  const showDialog = useDialogStore(state => state.showDialog)
  
  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Listado de Unidades de Medida</Typography>
          <Breadcrumb options={breadcrumbListPage} />
        </Box>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<SvgIcon icon="ic_add" />}
          onClick={() => showDialog(<MeasureUnitFormDialog />)}
        >
          Nuevo Registro
        </Button>
      </Stack>
      <Card>
        <MeasureUnitTable />
      </Card>
      <MuiDialog />
    </Container>
  );
}
