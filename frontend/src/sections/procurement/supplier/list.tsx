//@mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { breadcrumbListPage } from './context';

import SupplierTable from './components/supplier-table';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { RouterLink } from '../../../routes/components';
import { SvgIcon } from '../../../components/svg-color';

// ----------------------------------------------------------------------

export default function SupplierList() {
  return (
    <Container component='section' maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Listado de Proveedores</Typography>
          <Breadcrumb options={breadcrumbListPage} />          
        </Box>
        <Button
            href="/supplier/add"
            component={RouterLink}
            variant="contained"
            color="inherit"
            startIcon={<SvgIcon icon="ic_add" />}
          >
            Nuevo Registro
          </Button>
      </Stack>
      <Card>
        <SupplierTable />
      </Card>
    </Container>
  );
}
