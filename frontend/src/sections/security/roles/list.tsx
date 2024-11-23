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
import RoleTable from './components/role-table';

import { breadcrumbListPage } from './context';

// ----------------------------------------------------------------------

export default function RoleListPage() {

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Roles</Typography>
          <Breadcrumb options={breadcrumbListPage} />
        </Box>
        <Link component={RouterLink} href="/role/add" sx={{ display: 'contents' }}>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" width={20}/>}>
            Nuevo Rol
          </Button>
        </Link>
      </Stack>

      <Card>
        <RoleTable />
      </Card>
    </Container>
  );
}
