// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


import { useQueryClient } from '@tanstack/react-query';

import { breadcrumbAddPage } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import UserForm from './components/user-form';

// ----------------------------------------------------------------------

export default function UserAdd() {

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({queryKey: ['users']});
  }

  const DEFAULT_VALUES = {
    names: '',
    last_names: '',
    cedula: null,
    email: '',
    image: null,
    phone_number: '',
    address: '',
    username: '',
    password: '',
    is_active: true,
    groups: [],
    laboratory: null,
  }

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Nuevo usuario</Typography>
          <Breadcrumb options={breadcrumbAddPage} />
        </Box>
      </Stack>      
      <UserForm values={DEFAULT_VALUES} invalidateQuery={invalidateQuery} />
    </Container>
  );
}
