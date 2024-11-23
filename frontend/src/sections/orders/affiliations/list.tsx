//@mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useDialogStore, MuiDialog } from '../../../components/dialog';

import { BREADCRUMB_LIST_PAGE } from './context';

import AffiliationTable from './components/list/affiliation-table';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { SvgIcon } from '../../../components/svg-color';
import AffiliationDialogForm from './components/form/affiliation-dialog-form';

// ----------------------------------------------------------------------

export default function AffiliationList() {

  const showDialog = useDialogStore(state => state.showDialog)

  return (
    <Container component="section" maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Listado de Empresas</Typography>
          <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
        </Box>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<SvgIcon  icon='ic_add'/>}
          onClick={() => showDialog(<AffiliationDialogForm />, "sm")}
        >
          Nuevo Registro
        </Button>
      </Stack>
      <Card>
        <AffiliationTable />
      </Card>
      <MuiDialog />
    </Container>
  );
}
