//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { useGetData } from '../../../hooks/use-get-data';

import { QUERY_KEYS } from './context';

import { BREADCRUMB_ADD_PAGE } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ReceivingOrderForm from './components/form/receiving-order-form';
import Label from '../../../components/label';
import { ReceivingPurchaseFormValues } from '../../../types/procurements/receiving-order';

// ----------------------------------------------------------------------

export default function CreateReceivingOrder() {
  const { id } = useParams();

  const { data = {}, isLoading } = useGetData({
    url: `api/procurement/receiving-purchase/${id}/get-purchase-order`,
    queryKey: [QUERY_KEYS.PENDING, id],
  });

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PENDING] });
  };

  const DEFAULT_VALUES: ReceivingPurchaseFormValues = {
    order: data?.id,
    status: 'Parcialmente Recibido',
    comment: '',
    detail: data?.purchase_order_detail,
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="column" mb={4} spacing={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h4">Recibir Compra</Typography>
          <Typography variant="h4"> {'>'}</Typography>
            
            <Label color="primary" sx={{ typography: "h6" }}>#{data?.code}</Label>
        </Box>
        <Breadcrumb options={BREADCRUMB_ADD_PAGE} />
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <ReceivingOrderForm
          invalidateQuery={invalidateQuery}
          values={DEFAULT_VALUES}
          orderData={data}
        />
      )}
    </Container>
  );
}
