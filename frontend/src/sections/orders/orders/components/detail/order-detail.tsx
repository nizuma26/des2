//@Mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import { OrderDetailProps } from './types';
import { OrderDetail } from '../../../../../types/orders/orders';

import { useRouter } from '../../../../../routes/hooks';

import { MuiDialog, useDialogStore } from '../../../../../components/dialog';
import Iconify from '../../../../../components/iconify';
import OrderDataCard from './order-data-card';
import PatientDataCard from './patient-data-card';
import OrderDetailTable from './order-detail-table';
import InvoiceDataCard from './invoice-data-card';
import PaymentFormDialog from '../../../../common/dialogues/payment/payment-form-dialog';
import GenerateInvoiceDialog from '../../../../common/dialogues/invoice-order/generate-invoice-dialog';
import PrintInvoice from '../document-pdf/print-invoice';

// --------------------------------------------------------------

export default function OrderDetailSections({
  data,
  updatePaidData,
  updateStatus,
}: OrderDetailProps) {
  const router = useRouter();

  const showDialog = useDialogStore((state) => state.showDialog);

  const returnToListPage = () => router.replace('/order');

  const discount = data.detail.reduce(
    (previousValue: number, currentValue: OrderDetail) =>
      previousValue + (Number(currentValue.price) * Number(currentValue?.discount || 0)) / 100,
    0
  );

  const isInvoice = !!Number(data.main_total) && !data?.affiliation && data.is_invoiced === false && data.balance === 0;

  const [ciOrRif, clientName] = data.affiliation?.id
    ? [data.affiliation.rif, data.affiliation.name]
    : [data.patient.cedula, data.patient.full_name];

  const buttons = (
    <Stack direction="row" width={1}>
      <Box display="flex">
        <Button
          color="primary"
          onClick={returnToListPage}
          startIcon={<Iconify icon="fe:arrow-left" />}
        >
          Volver
        </Button>
      </Box>
      <Box display="flex" justifyContent="flex-end" width={1} gap={2}>
        {data.is_invoiced && (
          <PrintInvoice
            invoice={data}
            discount={discount}
            clientName={clientName}
            ciOrRif={ciOrRif}
          />
        )}

        {isInvoice && (
          <Button
            color="info"
            sx={{ transition: '180ms all' }}
            type="submit"
            startIcon={<Iconify icon="fluent:save-16-filled" />}
            onClick={() =>
              showDialog(
                <GenerateInvoiceDialog
                  orderId={data.id}
                  total={data.main_total}
                  secondaryTotal={data.secondary_total}
                  orderCode={data.code}
                  phone_number={data.patient.phone_number ?? ''}
                  address={data.patient.address}
                  paymentType={data.payment_type}
                  amoundPaid={data.amount_paid}
                  cedulaOrRif={ciOrRif}
                  clientName={clientName}
                  onSubmit={(data) => {
                    updateStatus(data.invoice_number);
                    // showAlert({
                    //   title: "Imprimir PDF",
                    //   content: "¿Desea imprimir la factura?",
                    //   icon: "solar:printer-bold-duotone",
                    //   fn: () => {},
                    //   customBtn: (<PrintInvoice invoice={data} discount={discount} />)
                    // })
                  }}
                />,
                'sm'
              )
            }
          >
            Facturar
          </Button>
        )}
        <Button
          color="info"
          sx={{ transition: '180ms all' }}
          type="submit"
          startIcon={<Iconify icon="fluent:save-16-filled" />}
          form="order-form"
          onClick={() =>
            showDialog(
              <PaymentFormDialog
                orderId={data.id}
                mainCurrencyCode={data.main_currency?.code}
                secondaryCurrencyCode={data.secondary_currency?.code}
                balance={data.balance}
                secondaryTotal={data.secondary_total}
                orderCode={data.code}
                paymentType={data.payment_type}
                onSubmit={(data) => {
                  updatePaidData(data.balance, data.amount_paid);
                }}
              />,
              'md'
            )
          }
        >
          {!!data.balance ? 'Abonar' : 'Ver abonos'}
        </Button>
      </Box>
    </Stack>
  );

  return (
    <Grid container rowGap={5} spacing={2}>
      <Grid xs={12}>
        <Card sx={{ px: 2, py: 1 }}>{buttons}</Card>
      </Grid>
      <Grid xs={12} md={8}>
        <OrderDataCard
          code={data.code}
          comment={data.comment}
          cost_type={data.cost_type}
          order_date={data.order_date}
          hour={data.hour}
          laboratory={data.laboratory}
          status={data.status}
          user={data.user}
          cash_register={data.cash_register}
          payment_type={data.payment_type}
        />
      </Grid>
      <Grid xs={12} md={4}>
        <PatientDataCard patient={data.patient} affiliation={data.affiliation} />
      </Grid>
      <Grid xs={12} md={8}>
        <OrderDetailTable
          labTests={data.detail}
          mainCurrencyCode={data.main_currency.code}
          secondaryCurrencyCode={data.secondary_currency.code}
        />
      </Grid>
      <Grid xs={12} md={4}>
        <InvoiceDataCard
          amountPaid={data.amount_paid}
          discount={discount}
          exchangeRate={data.exchange_rate}
          mainCurrencyCode={data.main_currency.code}
          secondaryCurrencyCode={data.secondary_currency.code}
          mainTotal={data.main_total}
          secondaryTotal={data.secondary_total}
          totalLabTests={data.detail.length}
          tax={data?.tax}
        />
      </Grid>
      <MuiDialog />
    </Grid>
  );
}
