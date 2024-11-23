import { useEffect } from 'react';
//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import { useQueryClient } from '@tanstack/react-query';

import { breadcrumbAddPage } from './context';
import { useGetData } from '../../../hooks/use-get-data';
import { useRouter } from '../../../routes/hooks';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import BeginningInventoryForm from './components/beginning-inventory-form';
import CircularProgress from '@mui/material/CircularProgress';
import ToastUtilities from '../../../components/toast/toast-manager';

// ----------------------------------------------------------------------

export default function EditBeginningInventory() {
  const { id } = useParams();

  const router = useRouter();

  const { data = {}, isLoading, isSuccess } = useGetData({
    url: `api/inventory/beginning-inventory/${id}/`,
    queryKey: ['beginning-inventory', id],
  });

  useEffect(() => {
    if (isSuccess && data.status !== 'En proceso') {
      router.push('/beginning-inventory');
      const status = data?.status
      ToastUtilities.info({msg: `No puede editar un inventario inicial que ya se encuentre ${status.toLowerCase()}`})
    }
  }, [data]);

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['beginning-inventory'] });
  };

  const currentDate = dayjs().format('YYYY-MM-DD');

  const DEFAULT_VALUES = {
    id: Number(id),
    laboratory: data?.laboratory?.id,
    laboratory_name: data?.laboratory?.name,
    status: data?.status,
    last_date: dayjs(currentDate),
    note: data?.note,
    total: data?.total,
    detail: data?.beginning_inventory_set,
  };

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Edición de inventario inicial</Typography>
          <Breadcrumb options={breadcrumbAddPage} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <BeginningInventoryForm invalidateQuery={invalidateQuery} values={DEFAULT_VALUES} />
      )}
    </Container>
  );
}
