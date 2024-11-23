import { useEffect } from 'react';
//@Mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from '../../../../../routes/hooks';
import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { useExchangeRate } from '../../../../../hooks/use-exchange-rate';

import { PurchaseOrderFormProps } from './types';
import { PurchaseOrderFormValues } from '../../../../../types/procurements/purchase-orders';

import { newPurchaseOrder, editPurchaseOrder } from '../../../../../api/procurement/purchase-order';

import { MuiDialog } from '../../../../../components/dialog';
import { BackIcon, SaveIcon } from '../../../../../components/iconify/default-icons';
import ToastUtilities from '../../../../../components/toast/toast-manager';
import ControlledDatePicker from '../../../../../components/controlled/controlled-datepicker';
import SupplierSearch from './supplier-search';
import SupplierDataCard from './supplier-data-card';
import PurchaseOrderDetailTable from './purchase-order-detail-table';
import InvoiceSummary from './invoice-summary';

// ------------------------------------------------------------------------

export default function PurchaseOrderForm({ values, invalidateQuery }: PurchaseOrderFormProps) {
  const form = useForm<PurchaseOrderFormValues>({
    defaultValues: values,
  });

  const router = useRouter();
  const mutate = useMutateData();
  const mutation = useMutation({
    mutationFn: !!values?.id ? editPurchaseOrder : newPurchaseOrder,
  });

  const currency = useExchangeRate();

  useEffect(() => {
    form.setValue('main_currency', currency?.mainCurrencyId);
    form.setValue('secondary_currency', currency?.secondaryCurrencyId);
    form.setValue('exchange_rate', currency?.exchangeRate ?? 0);
  }, [currency]);

  const returnToListPage = () => router.replace('/purchase-order');

  const onSubmit = (data: PurchaseOrderFormValues) => {
    console.log(data);
    if (!data?.detail.length) {
      return ToastUtilities.warning({
        msg: 'Debe cargar al menos un artículo en el detalle de la orden',
      });
    }
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        invalidateQuery();
        returnToListPage();
      },
    });
  };

  // const setDraftStatus = (status: 'Borrador' | 'Pendiente') => {
  //   form.setValue('status', status);
  // };

  const styleResponsive = {
    mb: 4,
    columnGap: 2,
    px: 3,
    rowGap: 4,
    display: 'grid',
  };

  return (
    <Grid container rowGap={4} spacing={3}>
      <FormProvider {...form}>
        <Grid xs={12}>
          <Card sx={{ px: 2, py: '12px' }}>
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
                    form="purchase-order-form"
                  >
                    Guardar
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid xs={12} md={7}>
          <Card sx={{ pb: 5 }}>
            <CardHeader title="Orden de Compra" />
            <Box py={3}>
              <form
                id="purchase-order-form"
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <Box
                  sx={{
                    ...styleResponsive,
                    gridTemplateColumns: { sm: 'repeat(1, 1fr)' },
                  }}
                >
                  <SupplierSearch
                    control={form.control}
                    setSupplierId={(id: number | null) => {
                      form.setValue('supplier', id);
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    ...styleResponsive,
                    gridTemplateColumns: { sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
                  }}
                >
                  <Stack>
                    <OutlinedInput
                      type="number"
                      fullWidth
                      startAdornment={
                        <InputAdornment disableTypography variant="standard" position="start">
                          Plazo de pago:
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment disableTypography position="end">
                          días
                        </InputAdornment>
                      }
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      {...form.register('payment_term', {
                        required: 'Ingrese un plazo de pago',
                        min: { value: 1, message: 'El plazo de pago no puede ser menor a un día' },
                      })}
                      error={!!form.formState.errors.payment_term}
                    />
                    {!!form.formState.errors.payment_term && (
                      <FormHelperText error={!!form.formState.errors.payment_term}>
                        {form.formState.errors.payment_term?.message}
                      </FormHelperText>
                    )}
                  </Stack>
                  <ControlledDatePicker
                    name="confirmed_date"
                    label="Fecha confirmada de entrega"
                    control={form.control}
                    isRequired={false}
                  />
                </Box>
                <Box px={3}>
                  <TextField
                    defaultValue={values?.comment}
                    fullWidth
                    label="Condiciones de envío"
                    multiline
                    rows={2}
                    sx={{ mb: 1 }}
                    {...form.register('comment')}
                  />
                </Box>
              </form>
            </Box>
          </Card>
        </Grid>
        <Grid xs={12} md={5}>
          <Card>
            <CardHeader title="Datos del Proveedor" />
            <CardContent sx={{ px: 2 }}>
              <SupplierDataCard
                setPaymentTerm={(paymentTerm) => {
                  form.setValue('payment_term', paymentTerm)
                  if (!!form.formState.errors.payment_term) {
                    form.clearErrors("payment_term")
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card>
            <CardHeader title="Artículos" />
            <CardContent sx={{ px: 0, py: 0 }}>
              <PurchaseOrderDetailTable />
              <InvoiceSummary
                mainCurrencyCode={currency?.mainCurrencyCode}
                secondaryCurrencyCode={currency?.secondaryCurrencyCode}
                exchangeRate={currency?.exchangeRate}
              />
            </CardContent>
          </Card>
        </Grid>
      </FormProvider>
      <MuiDialog />
    </Grid>
  );
}
