import { useEffect } from 'react';
//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import { useQueryClient } from '@tanstack/react-query';

import { useGetData } from '../../../hooks/use-get-data';

import { useRouter } from '../../../routes/hooks';

import { Purchase } from '../../../types/procurements/purchase';

import { breadcrumbAddPage } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import PurchaseForm from './components/form/purchase-form';
import ToastUtilities from '../../../components/toast';

// ----------------------------------------------------------------------

export default function EditPurchase() {

  const { id } = useParams();

  const { data={}, isLoading, isSuccess } = useGetData({
    url: `api/procurement/purchase/${id}/`,
    queryKey: ['purchase', id],
  });

  const router = useRouter();

  console.log(data)

  useEffect(() => {
    if (isSuccess && data.status !== 'Borrador') {
      router.push('/purchase');
      ToastUtilities.info({msg: 'No puede editar esta compra'})
    }
  }, [data]);

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['purchases'] });
    queryClient.invalidateQueries({ queryKey: ['purchase', id] });
  };

  const currentDate = dayjs().format('YYYY-MM-DD');

  const DEFAULT_VALUES:Purchase = {
    id: data?.id,
    laboratory: data?.laboratory,
    supplier: data?.supplier?.id,
    status: data?.status,
    payment_method: data?.payment_method,
    voucher: data?.voucher,
    currency: data?.currency?.id,
    observation: data?.observation,
    voucher_number: data?.voucher_number,
    exchange_rate: data?.currency?.exchange_rate,
    credit_days: data?.supplier?.credit_days,
    credit_limit: data?.supplier?.credit_limit,
    last_date: dayjs(currentDate),
    due_date: null,
    discount: 16,
    tax: data?.tax,
    subtotal_bs: data?.subtotal_bs,
    total_bs: data?.subtotal_bs,
    selected_currency_subtotal: data?.selected_currency_subtotal,
    selected_currency_total: data?.selected_currency_total,
    detail: data?.purchase_detail_set,
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Editar compra</Typography>
          <Breadcrumb options={breadcrumbAddPage} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
      ) : (
        <PurchaseForm invalidateQuery={invalidateQuery} values={DEFAULT_VALUES} />
      )}
    </Container>
  );
}
