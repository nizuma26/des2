//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';

import { useAuthPrivate } from '../../../auth/hooks/use-auth-private';

import { breadcrumbAddPage } from './context';

import { TokenDecode } from '../../../types';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import BeginningInventoryForm from './components/beginning-inventory-form';

// ----------------------------------------------------------------------

export default function CreateBeginningInventory() {
  const queryClient = useQueryClient();

  const token = useAuthPrivate((state) => state.access);

  const tokenDecode: TokenDecode = jwtDecode(token);

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['beginning-inventory'] });
  };

  const currentDate = dayjs().format('YYYY-MM-DD');

  const DEFAULT_VALUES = {
    laboratory: tokenDecode.laboratory_id,
    laboratory_name: tokenDecode.laboratory_name,
    status: 'En proceso',
    last_date: dayjs(currentDate),
    note: '',
    subtotal: 0.00,
    total: 0.00,
    detail: [],
  };

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Nuevo inventario inicial</Typography>
          <Breadcrumb options={breadcrumbAddPage} />
        </Box>
      </Stack>
      <BeginningInventoryForm invalidateQuery={invalidateQuery} values={DEFAULT_VALUES} />
    </Container>
  );
}
