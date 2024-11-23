import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from '../../../routes/components';

import Iconify from '../../../components/iconify';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import LaboratoryTable from './components/laboratory-table';

import { breadcrumbViewPage } from './context';

// ----------------------------------------------------------------------

export default function LaboratoryPage() {

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Listado de Laboratorios</Typography>
          <Breadcrumb options={breadcrumbViewPage} />
        </Box>
        <Link component={RouterLink} href="/laboratory/add" sx={{ display: 'contents' }}>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill"/>}>
            Nuevo Laboratorio
          </Button>
        </Link>
      </Stack>
      <Card>
        <LaboratoryTable />
      </Card>
    </Container>
  );
}
