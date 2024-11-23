//@Mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from '../../../../../routes/hooks';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { PurchaseRequisitionFormProps } from './types';
import { PurchaseRequisitionFormValues } from '../../../../../types/procurements/purchase-requisition';

import {
  editPurchaseRequisition,
  newPurchaseRequisition,
} from '../../../../../api/procurement/purchase-requisition';

import RequisitionDetailTable from './requisition-detail-table';
import Iconify from '../../../../../components/iconify';
import ControlledDatePicker from '../../../../../components/controlled/controlled-datepicker';
import ToastUtilities from '../../../../../components/toast/toast-manager';
import { useDialogStore, MuiDialog } from '../../../../../components/dialog';

export default function PurchaseRequisitionForm({
  values,
  laboratoryName,
  requester,
  invalidateQuery,
}: PurchaseRequisitionFormProps) {
  const form = useForm<PurchaseRequisitionFormValues>({
    defaultValues: values,
  });  

  const router = useRouter();
  const mutate = useMutateData();
  const closeDialog = useDialogStore.getState().closeDialog;

  const mutation = useMutation({
    mutationFn: !!values?.id ? editPurchaseRequisition : newPurchaseRequisition,
  });

  const returnToListPage = () => router.replace('/purchase-requisition');

  const onSubmit = (data: PurchaseRequisitionFormValues) => {
    if (!data?.detail.length) {
      return ToastUtilities.warning({ msg: 'Debe cargar al menos un artículo en su detalle' });
    }
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        returnToListPage();
        invalidateQuery();
        closeDialog();
      },
    });
  };

  const setDraftStatus = (status: 'Borrador' | 'Pendiente') => {
    form.setValue('status', status);
  };

  const styleResponsive = {
    mb: 4,
    columnGap: 3,
    px: 3,
    rowGap: 4,
    display: 'grid',
  };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12} lg={12}>
        <Card sx={{ overflow: 'visible' }}>
          <Box py={4}>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} noValidate autoComplete="off">
                <Box
                  sx={{
                    ...styleResponsive,
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                  }}
                >
                  <TextField
                    defaultValue={requester}
                    fullWidth
                    label="Solicitante"
                    disabled
                  />
                  <TextField
                    defaultValue={laboratoryName}
                    fullWidth
                    label="Laboratorio"
                    sx={{borderColor: "red"}}
                    disabled
                  />
                  <ControlledDatePicker
                    name="required_date"
                    label="Fecha requerida"
                    control={form.control}
                  />
                </Box>
                <Box px={3}>
                  <TextField
                    defaultValue={values?.comment}
                    fullWidth
                    label="Comentario"
                    multiline
                    rows={2}
                    sx={{ mb: 1 }}
                    {...form.register('comment')}
                  />
                </Box>
                <RequisitionDetailTable />
                <Stack
                  direction="row"
                  display="flex"
                  justifyContent="flex-end"
                  gap={1}
                  mt={5}
                  px={3}
                  sx={{
                    '@media (max-width: 547px)': {
                      flexDirection: 'column',
                    },
                  }}
                >
                  <LoadingButton
                    id="purchase-submit"
                    variant="contained"
                    color="inherit"
                    loading={mutation.isPending}
                    sx={{ transition: '180ms all' }}
                    type="submit"
                    onClick={() => setDraftStatus('Pendiente')}
                  >
                    Finalizar requisición
                  </LoadingButton>
                  <LoadingButton
                    id="purchase-submit"
                    variant="contained"
                    color="inherit"
                    loading={mutation.isPending}
                    sx={{ transition: '180ms all' }}
                    onClick={() => setDraftStatus('Borrador')}
                    type="submit"
                  >
                    Guardar como borrador
                  </LoadingButton>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={returnToListPage}
                  >
                    Cancelar
                  </Button>
                </Stack>
              </form>
              <MuiDialog />
            </FormProvider>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
