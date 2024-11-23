//@Mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from '../../../../../routes/hooks';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { ReceivingOrderFormProps } from './types';
import { ReceivingPurchaseFormValues } from '../../../../../types/procurements/receiving-order';

import {
  editReceivingPurchaseOrder,
  newReceivingPurchaseOrder,
} from '../../../../../api/procurement/receiving-purchase-order';

import { BackIcon, SaveIcon, CheckIcon } from '../../../../../components/iconify/default-icons';
//import ToastUtilities from '../../../../../components/toast/toast-manager';
import ReceivingOrderDetailTable from './receiving-order-detail-table';
import ItemInfo from './item-info';

// ------------------------------------------------------------------------

export default function ReceivingOrderForm({
  values,
  orderData,
  invalidateQuery,
}: ReceivingOrderFormProps) {
  const form = useForm<ReceivingPurchaseFormValues>({
    defaultValues: values,
  });

  const router = useRouter();

  const mutate = useMutateData();
  const mutation = useMutation({
    mutationFn: !!values?.id ? editReceivingPurchaseOrder : newReceivingPurchaseOrder,
  });

  const acceptAll = () => {
    const detail = form.getValues('detail');
    return detail.forEach((item, index) => {
      form.setValue(`detail.${index}.received_quantity`, item.expected_quantity);
    });
  };

  const returnToListPage = () => router.replace('/receiving-purchase-order');

  const onSubmit = (data: ReceivingPurchaseFormValues) => {
    let newData = data;
    const detail = form.getValues('detail');
    const status = detail.some(item => Number(item.received_quantity) != Number(item.expected_quantity));
    if (status) {
      newData['status'] = 'Parcialmente Recibido'
    } else {
      newData['status'] = 'Completamente Recibido'
    }
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        invalidateQuery();
        returnToListPage();
      },
    });
  };

  return (
    <Grid container rowGap={5} spacing={2}>
      <FormProvider {...form}>
        <Grid xs={12}>
          <Card sx={{ px: 2, py: '12px'}}>
            <Stack direction="row" width={1}>
              <Box display="flex">
                <Button color="primary" onClick={returnToListPage} startIcon={<BackIcon />}>
                  Volver
                </Button>
              </Box>
              <Box display="flex" justifyContent="flex-end" width={1} gap={2}>
                <Box display="flex">
                  <Button
                    type="submit"
                    variant="contained"
                    color="inherit"
                    startIcon={<SaveIcon />}
                    form="receiving-order-form"
                  >
                    Guardar
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card sx={{ overflow: 'visible' }}>
            <CardHeader title="Datos de la Orden de Compra" />
            <CardContent sx={{ px: 2 }}>
              <Stack spacing={2}>
                <Stack width={1} direction={{ sm: 'column', md: 'row' }}>
                  <ItemInfo label="Proveedor" value={orderData?.supplier?.legal_name} />
                  <ItemInfo label="RIF" value={orderData?.supplier?.rif} />
                </Stack>
                <Stack width={1} direction="row">
                  <ItemInfo label="Comentario" value={orderData?.comment} />
                </Stack>
                <form id="receiving-order-form" onSubmit={form.handleSubmit(onSubmit)}>
                  <Stack py={1} px={1}>
                    {/* <ControlledSelect
                    control={form.control}
                    options={RECEIVING_ORDER_STATUS}
                    name="status"
                    label="Estado"
                  /> */}
                    <TextField
                      defaultValue={values?.comment}
                      fullWidth
                      label="Comentario"
                      multiline
                      rows={2}
                      sx={{ mb: 1 }}
                      {...form.register('comment')}
                    />
                  </Stack>
                </form>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card>
            <CardHeader
              title="Recibir Artículos"
              action={
                <Button
                  onClick={acceptAll}
                  color="inherit"
                  startIcon={<CheckIcon />}
                  form="receiving-order-form"
                >
                  Aceptar todo
                </Button>
              }
            />
            <CardContent sx={{ px: 0, py: 3 }}>
              <ReceivingOrderDetailTable />
            </CardContent>
          </Card>
        </Grid>
      </FormProvider>
    </Grid>
  );
}
