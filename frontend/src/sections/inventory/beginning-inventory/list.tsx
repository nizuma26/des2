import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { breadcrumbViewPage } from './context';

import { RouterLink } from '../../../routes/components';
import Iconify from '../../../components/iconify';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import BeginningInventoryTable from './components/beginning-inventory-table';

// ----------------------------------------------------------------------

export default function BeginningInventoryList() {

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Inventario Inicial</Typography>
          <Breadcrumb options={breadcrumbViewPage} />
        </Box>
        <Link component={RouterLink} href="/beginning-inventory/add" sx={{ display: 'contents' }}>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill"/>}>
            Nuevo Inventario Inicial
          </Button>
        </Link>
      </Stack>
      <Card>
        <BeginningInventoryTable />
      </Card>
    </Container>
  );
}
