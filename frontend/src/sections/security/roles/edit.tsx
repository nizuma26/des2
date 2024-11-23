// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import RoleForm from './components/role-form';
import { useGetData } from '../../../hooks/use-get-data';

// ----------------------------------------------------------------------

export default function EditRole() {
  
  const { id } = useParams();

  const { data={}, isLoading } = useGetData({
    url: `/api/users/role/${id}/`,
    queryKey: ['role', id]
  })

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({queryKey: ['roles']});
    queryClient.invalidateQueries({queryKey: ['role', id]});
  }

  const DEFAULT_VALUES = {
    id: data?.id,
    name: data?.name,
    permissions: data?.permissions,
  }

  const options = [
    { name: 'Dashboard', route: '/', type: 'link' },
    { name: 'Usuarios', route: '/role', type: 'link' },
    { name: data?.name, type: 'typography' },
  ];

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Editar rol</Typography>
          <Breadcrumb options={options} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
          <RoleForm values={DEFAULT_VALUES} invalidateQuery={invalidateQuery} />
      )}
    </Container>
  );
}
