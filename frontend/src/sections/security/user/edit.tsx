// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import UserForm from './components/user-form';
import { useGetData } from '../../../hooks/use-get-data';

// ----------------------------------------------------------------------

export default function UserEdit() {
  
  const { id } = useParams();

  const { data={}, isLoading } = useGetData({
    url: `/api/users/user/${id}/`,
    queryKey: ['user', id]
  })

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({queryKey: ['users']});
    queryClient.invalidateQueries({queryKey: ['user', id]});
  }

  const DEFAULT_VALUES = {
    id: data?.id,
    names: data?.names,
    last_names: data?.last_names,
    cedula: data?.cedula,
    email: data?.email,
    image: data?.image,
    phone_number: data?.phone_number,
    address: data?.address,
    username: data?.username,
    password: data?.password,
    is_active: data?.is_active,
    groups: data?.groups,
    laboratory: data?.laboratory,
    cash_register: data?.cash_register,
  }

  const options = [
    { name: 'Dashboard', route: '/', type: 'link' },
    { name: 'Usuarios', route: '/user', type: 'link' },
    { name: data?.username, type: 'typography' },
  ];

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Editar usuario</Typography>
          <Breadcrumb options={options} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
          <UserForm values={DEFAULT_VALUES} invalidateQuery={invalidateQuery} />
      )}
    </Container>
  );
}
