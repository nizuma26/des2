//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { Purchase } from '../../../types/procurements/purchase';
import { TokenDecode } from '../../../types';

import dayjs from 'dayjs';

import { useQueryClient } from '@tanstack/react-query';

import { useAuthPrivate } from '../../../auth/hooks/use-auth-private';
import { jwtDecode } from 'jwt-decode';

import { breadcrumbAddPage } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import PurchaseForm from './components/form/purchase-form';

// ----------------------------------------------------------------------

export default function CreatePurchase() {
  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['purchases'] });
  };

  const token = useAuthPrivate((state) => state.access);

  const tokenDecode: TokenDecode = jwtDecode(token);

  const currentDate = dayjs().format('YYYY-MM-DD');

  const DEFAULT_VALUES:Purchase = {
    laboratory: tokenDecode.laboratory_id,
    supplier: '',
    status: 'Borrador',
    payment_method: '',
    voucher: null,
    currency: null,
    observation: '',
    voucher_number: '',
    exchange_rate: 0.00,
    credit_days: null,
    credit_limit: null,
    last_date: dayjs(currentDate),
    due_date: null,
    discount: 16,
    tax: 16,
    subtotal_bs: 0.00,
    total_bs: 0.00,
    selected_currency_total: 0.00,
    selected_currency_subtotal: 0.00,
    detail: [],
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Nueva orden de compra</Typography>
          <Breadcrumb options={breadcrumbAddPage} />
        </Box>
      </Stack>
      <PurchaseForm invalidateQuery={invalidateQuery} values={DEFAULT_VALUES} />
    </Container>
  );
}
