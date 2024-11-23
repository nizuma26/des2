// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useQueryClient } from '@tanstack/react-query';

import { breadcrumbAddPage } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import RoleForm from './components/role-form';

// ----------------------------------------------------------------------

export default function CreateRole() {

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({queryKey: ['roles']});
  }

  const DEFAULT_VALUES = {
    name: '',
    permissions: [],
  }

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Nuevo rol de usuario</Typography>
          <Breadcrumb options={breadcrumbAddPage} />
        </Box>
      </Stack>
      <RoleForm values={DEFAULT_VALUES} invalidateQuery={invalidateQuery} />
    </Container>
  );
}
