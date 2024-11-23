//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import dayjs from 'dayjs';

import { jwtDecode } from 'jwt-decode';

import { TokenDecode } from '../../../types';

import { useQueryClient } from '@tanstack/react-query';
import { useAuthPrivate } from '../../../auth/hooks/use-auth-private';

import { PurchaseRequisitionFormValues } from '../../../types/procurements/purchase-requisition';

import { BREADCRUMB_ADD_PAGE } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import RequisitionForm from './components/form/requisition-form';

// ----------------------------------------------------------------------

export default function CreatePurchaseRequisition() {
  const queryClient = useQueryClient();

  const token = useAuthPrivate((state) => state.access);

  const tokenDecode: TokenDecode = jwtDecode(token);

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['purchase-requisitions'] });
  };

  const currentDate = dayjs().format('YYYY-MM-DD');

  const DEFAULT_VALUES: PurchaseRequisitionFormValues = {
    laboratory: tokenDecode.laboratory_id,
    status: 'Pendiente',
    comment: '',
    required_date: dayjs(currentDate),
    request_date: dayjs(currentDate),
    detail: [],
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Nueva requisición</Typography>
          <Breadcrumb options={BREADCRUMB_ADD_PAGE} />
        </Box>
      </Stack>
      <RequisitionForm
        invalidateQuery={invalidateQuery}
        laboratoryName={tokenDecode.laboratory_name}
        requester={tokenDecode?.username}
        values={DEFAULT_VALUES}
      />
    </Container>
  );
}
