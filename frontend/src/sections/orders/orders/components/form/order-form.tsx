//@Mui
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { OrderFormProps } from '../types';
import { OrderFormValues } from '../../../../../types/orders/orders';
import { CostType } from '../../../../../types/configuration/lab-test';

import { useRouter } from '../../../../../routes/hooks';
import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { useExchangeRate } from '../../../../../hooks/use-exchange-rate';

import { newOrder, editOrder } from '../../../../../api/orders/orders';

import { COST_TYPE } from '../../context';

import { MuiDialog } from '../../../../../components/dialog';


import { SvgIcon } from '../../../../../components/svg-color';
import ToastUtilities from '../../../../../components/toast/toast-manager';
import OrderDetailTable from './order-detail-table';
import ControlledSelect from '../../../../../components/controlled/controlled-select';
import ControlledDatePicker from '../../../../../components/controlled/controlled-datepicker';
import PatientSearch from './patient-search';
import AffiliationSearch from './affiliation-search';
import PatientData from './patient-data';
import InvoiceSummary from './invoice-summary';


export default function OrderForm({ values, invalidateQuery }: OrderFormProps) {
  const form = useForm<OrderFormValues>({
    defaultValues: values,
  });

  const router = useRouter();
  const mutate = useMutateData();
  //const showAlert = useAlert(state => state.showAlert);

  const mutation = useMutation({
    mutationFn: !!values?.id ? editOrder : newOrder,
  });

  const currency = useExchangeRate();

  form.setValue('main_currency', currency.mainCurrencyId);
  form.setValue('secondary_currency', currency.secondaryCurrencyId);
  form.setValue('exchange_rate', currency.exchangeRate);

  const returnToListPage = () => router.replace('/order');

  const onSubmit = (data: OrderFormValues) => {
    console.log(data);
    if (!data?.detail.length) {
      return ToastUtilities.warning({
        msg: 'Debe cargar al menos un examen en el detalle de la orden',
      });
    }
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        router.replace(`/order/detail/${response.data.id}`);
        invalidateQuery();
      },
    });
  };

  // const setDraftStatus = (status: 'Borrador' | 'Pendiente') => {
  //   form.setValue('status', status);
  // };

  const styleResponsive = {
    mb: 4,
    columnGap: 3,
    px: 3,
    rowGap: 3,
    display: 'grid',
  };

  // const showPaymentDialog = () => {
  //   if (form.getValues().detail?.length === 0) {
  //     return ToastUtilities.warning({
  //       msg: 'Debe cargar al menos un examen en el detalle de la orden',
  //     });
  //   }
  //   const mainTotal = form.getValues('main_total');
  //   const secondaryTotal = form.getValues('secondary_total');
  //   const paymentType = form.getValues('payment_type');
  //   showDialog(
  //     <PaymentOrderDialog
  //       mainTotal={mainTotal}
  //       secondaryTotal={secondaryTotal}
  //       paymentType={paymentType}
  //       control={form.control}
  //       mainCurrencyCode={currency.mainCurrencyCode}
  //       secondaryCurrencyCode={currency.secondaryCurrencyCode}
  //       loading={mutation.isPending}
  //     />,
  //     'md'
  //   );
  // };

  return (
    <Grid container rowGap={5} spacing={2}>
      <FormProvider {...form}>
        <Grid xs={12}>
          <Card sx={{ px: 2, py: 1 }}>
            <Stack direction="row" width={1}>
              <Box display="flex">
                <Button
                  color="info"
                  onClick={returnToListPage}
                  startIcon={<SvgIcon icon="ic_back" />}
                >
                  Volver
                </Button>
              </Box>
              <Box display="flex" justifyContent="flex-end" width={1} gap={2}>
                {/* <PaymentOrderDialog
                  formValues={form.getValues}
                  control={form.control}
                  mainCurrencyCode={currency.mainCurrencyCode}
                  secondaryCurrencyCode={currency.secondaryCurrencyCode}
                  loading={mutation.isPending}
                  setPaymentAmount={(amount) => form.setValue('amount_paid', amount)}
                /> */}
                <Button
                  variant='contained'
                  type="submit"
                  color="inherit"
                  startIcon={<SvgIcon icon="ic_save" />}
                  form="order-form"
                >
                  Guardar
                </Button>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid xs={12} md={8}>
          <Card>
            <CardHeader title="Datos de la orden" />
            <Box py={4}>
              <form
                id="order-form"
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
                  <PatientSearch
                    setPatientId={(id: number | null) => {
                      form.setValue('patient', id);
                      if (id === null) {
                        form.setValue('affiliation', null);
                      }
                    }}
                    setPatientNumber={(patientNumber) =>
                      form.setValue('patient_number', patientNumber)
                    }
                    control={form.control}
                  />
                  <AffiliationSearch
                    control={form.control}
                    onSelected={(data) => {
                      const costType = COST_TYPE.find(cost => cost.label === data?.price_type)?.value ?? "affiliated"
                      form.setValue('cost_type', costType as CostType);
                    }}
                  />
                  <ControlledSelect
                    control={form.control}
                    options={COST_TYPE}
                    name="cost_type"
                    label="Tipo de costo"
                  />
                  {/* <TaxSearch name="tax" control={form.control} setValue={form.setValue} typeTax='General' /> */}
                  {/* <ControlledSelect
                    control={form.control}
                    options={PAYMENT_TYPES_CHOICES}
                    name="payment_type"
                    label="Condición de pago"
                  /> */}
                  <ControlledDatePicker
                    control={form.control}
                    name="delivery_date"
                    label="Fecha de entrega"
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
              </form>
            </Box>
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          <Card>
            <CardHeader title="Datos del paciente" />
            <CardContent>
              <PatientData />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={8}>
          <Card>
            <CardHeader title="Examenes solicitados" />
            <CardContent sx={{ px: 0, py: 0 }}>
              <OrderDetailTable
                mainCurrencyCode={currency.mainCurrencyCode}
                secondaryCurrencyCode={currency.secondaryCurrencyCode}
                exchangeRate={currency.exchangeRate}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          <Card>
            <CardHeader title="Datos de la factura" />
            <CardContent sx={{ px: 0, py: 0 }}>
              <InvoiceSummary
                mainCurrencyCode={currency.mainCurrencyCode}
                secondaryCurrencyCode={currency.secondaryCurrencyCode}
                exchangeRate={currency.exchangeRate}
              />
            </CardContent>
          </Card>
        </Grid>
      </FormProvider>
      <MuiDialog />
    </Grid>
  );
}
