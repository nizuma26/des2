import { useEffect } from 'react';
//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { TokenDecode } from '../../../types';
import { PurchaseRequisitionFormValues } from '../../../types/procurements/purchase-requisition';

import { jwtDecode } from 'jwt-decode';

import dayjs from 'dayjs';

import { useParams } from 'react-router-dom';

import { useAuthPrivate } from '../../../auth/hooks/use-auth-private';

import { useQueryClient } from '@tanstack/react-query';

import { useGetData } from '../../../hooks/use-get-data';

import { useRouter } from '../../../routes/hooks';

import { BREADCRUMB_ADD_PAGE, QUERY_KEYS } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import RequisitionForm from './components/form/requisition-form';
import ToastUtilities from '../../../components/toast';

// ----------------------------------------------------------------------

export default function EditPurchaseRequisition() {
  const { id } = useParams();

  const {
    data = {},
    isLoading,
  } = useGetData({
    url: `api/procurement/purchase-requisition/${id}/`,
    queryKey: [QUERY_KEYS.list, id],
    staleTime: 10,
  });

  const token = useAuthPrivate((state) => state.access);

  const tokenDecode: TokenDecode = jwtDecode(token);

  const router = useRouter();

  const disallowedStatuses = ['Borrador', 'Devuelto'];

  useEffect(() => {
    if (data?.status !== undefined && data?.status !== null && !disallowedStatuses.includes(data.status)) {
      router.push('/purchase-requisition');
      ToastUtilities.info({ msg: 'No puede editar esta requisición' });
    }
  }, [data]);

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list, id] });
  };

  const currentDate = dayjs().format('YYYY-MM-DD');

  const DEFAULT_VALUES: PurchaseRequisitionFormValues = {
    id: data?.id,
    laboratory: tokenDecode.laboratory_id,
    status: data?.status,
    comment: data?.comment,
    required_date: dayjs(data?.required_date),
    request_date: dayjs(currentDate),
    detail: data?.requisition_detail_set,
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Editar requisición</Typography>
          <Breadcrumb options={BREADCRUMB_ADD_PAGE} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <RequisitionForm
          invalidateQuery={invalidateQuery}
          laboratoryName={tokenDecode.laboratory_name}
          requester={tokenDecode?.username}
          values={DEFAULT_VALUES}
        />
      )}
    </Container>
  );
}
