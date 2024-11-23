import { useEffect } from 'react';
//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { ApprovalRequisitionValues } from '../../../types/procurements/approvals';

import dayjs from 'dayjs';

import { useParams } from 'react-router-dom';

import { useGetData } from '../../../hooks/use-get-data';

import { useRouter } from '../../../routes/hooks';

import { BREADCRUMB_APPROVE_REQUISITION_PAGE } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ToastUtilities from '../../../components/toast';
import RequisitionApprovalInfo from './components/approval/requisition-approval-info';
import Label from '../../../components/label';
// ----------------------------------------------------------------------

export default function ApprovalRequisition() {
  
  const { id } = useParams();

  const {
    data = {},
    isLoading,
    isSuccess,
  } = useGetData({
    url: `api/procurement/purchase-requisition/${id}/`,
    queryKey: ['purchase-requisition', id],
    staleTime: 10,
    enabled: !!id,
  });

  const router = useRouter();

  useEffect(() => {
    if (isSuccess && data.status !== 'Pendiente') {
      router.push('/purchase-requisition');
      ToastUtilities.info({ msg: 'No puede editar esta requisición' });
    }
  }, [data]);

  const currentDate = dayjs().format('YYYY-MM-DD');

  const DEFAULT_VALUES: ApprovalRequisitionValues = {
    action: 'Aprobado',
    comment: '',
    operation: 'Requisición de compra',
    operation_code: data.code,
    approval_date: dayjs(currentDate),
    detail: data?.requisition_detail_set,
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack mb={5}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h4">
            Aprobar requisición
          </Typography>
            <Label color="primary" sx={{ fontSize: 15, mt: 1 }}>
              {data?.code}
            </Label>
        </Box>
          <Breadcrumb options={BREADCRUMB_APPROVE_REQUISITION_PAGE} />
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <RequisitionApprovalInfo defaultValues={DEFAULT_VALUES} requisitionData={data} />
      )}
    </Container>
  );
}
