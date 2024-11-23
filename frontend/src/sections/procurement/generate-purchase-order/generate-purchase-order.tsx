//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

//import dayjs from 'dayjs';

import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { PurchaseOrderFormValues } from '../../../types/procurements/purchase-orders';

import { useGetData } from '../../../hooks/use-get-data';

import { BREADCRUMB_ADD_PAGE } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import PurchaseOrderForm from '../purchase-order/components/form/purchase-order-form';
import { QUERY_KEYS } from '../purchase-order/context';

// ----------------------------------------------------------------------

export default function GeneratePurchaseOrder() {
  const { id } = useParams();

  const {
    data = {},
    isLoading,
  } = useGetData({
    url: `api/procurement/purchase-order/get-requisition/?id=${id}`,
    queryKey: ['generate-purchase-order', id],
    staleTime: 0,
  });

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
  };
  
//   const DEFAULT_VALUES: PurchaseRequisitionFormValues = {
//     id: data?.id,
//     laboratory: tokenDecode.laboratory_id,
//     status: data?.status,
//     comment: data?.comment,
//     required_date: dayjs(data?.required_date),
//     request_date: dayjs(currentDate),
//     detail: data?.requisition_detail_set,
//   };

  const DEFAULT_FORM_VALUES:PurchaseOrderFormValues = {
    requisition: data?.id,
    main_currency: null,
    secondary_currency: null,
    exchange_rate: 0,
    comment: '',
    discount: 0.00,
    order_date: null,
    confirmed_date: null,
    required_date: null,
    status: 'Pendiente',
    payment_term: null,
    main_total: 0.00,
    amount_paid: 0.00,
    secondary_total: 0.00,
    tax: null,
    detail: data?.requisition_detail_set,
    payments: [],
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Generar Orden de Compra</Typography>
          <Breadcrumb options={BREADCRUMB_ADD_PAGE} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <PurchaseOrderForm invalidateQuery={invalidateQuery} values={DEFAULT_FORM_VALUES} />
      )}
    </Container>
  );
}
