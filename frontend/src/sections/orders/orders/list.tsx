//@mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { BREADCRUMB_LIST_PAGE } from './context';

import { useHasLaboratory } from '../../../hooks/use-has-laboratory';

import ProtectedContent from '../../../auth/components/protected-content';
import OrderTable from './components/list/order-table';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { RouterLink } from '../../../routes/components';
import { SvgIcon } from '../../../components/svg-color';

// ----------------------------------------------------------------------

export default function OrderList() {

  useHasLaboratory();

  return (
    <Container component="section" maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Listado de Ordenes</Typography>
          <Breadcrumb options={BREADCRUMB_LIST_PAGE} />
        </Box>
        <ProtectedContent perms={['add_order']}>
          <Button
            href="/order/add"
            component={RouterLink}
            variant="contained"
            color="inherit"
            startIcon={<SvgIcon icon="ic_add" />}
          >
            Nuevo Registro
          </Button>
        </ProtectedContent>
      </Stack>
      <Card>
        <OrderTable />
      </Card>
    </Container>
  );
}
