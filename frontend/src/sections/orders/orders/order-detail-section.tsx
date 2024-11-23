import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { Order } from '../../../types/orders/orders';

import { useMutateData } from '../../../hooks/use-mutate-data';

import { useGetData } from '../../../hooks/use-get-data';

import { BREADCRUMB_ADD_PAGE, QUERY_KEYS } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import OrderDetailSections from './components/detail/order-detail';
import Label from '../../../components/label';

// ----------------------------------------------------------------------

export default function OrderDetailSection() {
  const { id } = useParams();

  const { data = {}, isLoading } = useGetData({
    url: `api/orders/order/${id}/`,
    queryKey: [QUERY_KEYS.list, id],
  });

  console.log(data)

  const { updateData } = useMutateData();

  const updatePaidData = (balance: number, amountPaid: number) => {
    updateData({
      queryKey: [QUERY_KEYS.list, id],
      fields: ['balance', 'amount_paid'],
      values: [balance, amountPaid],
      many: false,
    });
  };

  const updateStatus = (invoiceNumber: string) => {
    updateData({
      queryKey: [QUERY_KEYS.list, id],
      fields: ['status', 'invoice_number'],
      values: ['Facturado', invoiceNumber],
      many: false,
    });
  };

  const orderData: Order = {
    id: data?.id,
    tax: data?.tax,
    code: data?.code,
    patient: data?.patient,
    user: data?.user,
    cash_register: data?.cash_register,
    affiliation: data?.affiliation,
    laboratory: data?.laboratory,
    order_date: data.order_date,
    comment: data?.comment,
    patient_number: 2,
    main_currency: data?.main_currency,
    secondary_currency: data?.secondary_currency,
    main_total: data?.main_total,
    secondary_total: data?.secondary_total,
    amount_paid: data?.amount_paid,
    exchange_rate: data?.exchange_rate,
    cost_type: data?.cost_type,
    payment_type: data?.payment_type,
    hour: data?.hour,
    status: data?.status,
    balance: data?.balance,
    detail: data?.order_detail,
    payments: []
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack justifyContent="space-between" mb={5}>
        <Box display="flex" gap={1} alignItems="center">
          <Typography variant="h4">Detalle de la Orden {'>'}</Typography>
          <Label color="primary" sx={{ typography: 'subtitle3', fontSize: 16, p: 2 }}>{orderData.code}</Label>
        </Box>
          <Breadcrumb options={BREADCRUMB_ADD_PAGE} />
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <OrderDetailSections data={orderData} updatePaidData={updatePaidData} updateStatus={updateStatus} />
      )}
    </Container>
  );
}
