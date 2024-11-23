import { lazy, Suspense } from 'react';
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

import { newPurchase, editPurchase } from '../../../../../api/procurement/purchase';
import { useRouter } from '../../../../../routes/hooks';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { Purchase, PurchaseFormProps } from '../../../../../types/procurements/purchase';

import DetailTable from './detail-table';
import Iconify from '../../../../../components/iconify';
import { RouterLink } from '../../../../../routes/components';
import { ControlledDatePicker } from '../../../../../components/controlled';
import SupplierAutocomplete from '../../../common/supplier-autocomplete';
import VoucherAutocomplete from '../../../../common/autocompletes/voucher-autocomplete';
import CurrencyAutocomplete from '../../../../common/autocompletes/currency-autocomplete';
import InvoiceSummary from './invoice-summary';
import ToastUtilities from '../../../../../components/toast/toast-manager';
import { useDialogStore, MuiDialog } from '../../../../../components/dialog';
import { LoadModalSekeleton } from '../../../../../components/skeleton';
import LaboratoryAutocomplete from '../../../../common/autocompletes/laboratory-autocomplete';

const PaymentModalContent = lazy(
  () => import('../../../../common/payment-modal/payment-modal-content')
);

export default function PurchaseForm({ values, invalidateQuery }: PurchaseFormProps) {
  const form = useForm<Purchase>({
    defaultValues: values,
  });

  const router = useRouter();
  const mutate = useMutateData();
  const showDialog = useDialogStore.getState().showDialog;
  const closeDialog = useDialogStore.getState().closeDialog;

  const mutation = useMutation({
    mutationFn: !!values?.id ? editPurchase : newPurchase,
  });

  const onSubmit = (data: Purchase) => {
    if (!data.detail.length) {
      return ToastUtilities.warning({ msg: 'Debe cargar al menos un artículo en su detalle' });
    }
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        invalidateQuery();
        router.replace('/purchase');
        closeDialog();
      },
    });
  };

  const setDraftStatus = () => {
    form.setValue('status', 'Borrador');
    form.setValue('payment_method', '');
  };

  const showDialogPayment = () => {

    if (!form.getValues().supplier) {
      return ToastUtilities.warning({
        msg: 'Debe seleccionar un proveedor antes de completar la compra',
      });
    }
    const totalBs = form.getValues('total_bs');
    const selectedCurrencyTotal = form.getValues('selected_currency_total');

    const paymentDialog = (
    <Suspense fallback={<LoadModalSekeleton height={350} alignButtons="center" />}>
      <PaymentModalContent
        totalBs={totalBs}
        selectedCurrencyTotal={selectedCurrencyTotal}
        title="Completar compra"
        icon="solar:cart-large-4-bold-duotone"
        onClose={closeDialog}
      />
    </Suspense>
    )
    showDialog(paymentDialog, 'sm')
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
              <form
                id="purchase-form"
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <Box
                  sx={{
                    ...styleResponsive,
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                  }}
                >                  
                  <LaboratoryAutocomplete control={form.control} />
                  <SupplierAutocomplete control={form.control} />
                  <ControlledDatePicker name="last_date" label="Fecha" control={form.control} />
                  <CurrencyAutocomplete control={form.control} />
                  <VoucherAutocomplete control={form.control} />
                  <TextField
                    defaultValue={values?.voucher_number}
                    fullWidth
                    label="Número de comprobante"
                    {...form.register('voucher_number')}
                  />
                </Box>
                <Box px={3}>
                  <TextField
                    defaultValue={values?.observation}
                    fullWidth
                    label="Observación"
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                    {...form.register('observation')}
                  />
                </Box>

                <DetailTable />
                <InvoiceSummary />
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
                    type="button"
                    onClick={showDialogPayment}
                  >
                    Completar orden de compra
                  </LoadingButton>
                  <LoadingButton
                    id="purchase-submit"
                    variant="contained"
                    color="inherit"
                    loading={mutation.isPending}
                    sx={{ transition: '180ms all' }}
                    onClick={setDraftStatus}
                    type="submit"
                  >
                    Guardar como borrador
                  </LoadingButton>
                  <Button
                    href="/purchase"
                    variant="outlined"
                    color="primary"
                    component={RouterLink}
                    startIcon={<Iconify icon="eva:plus-fill" />}
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
