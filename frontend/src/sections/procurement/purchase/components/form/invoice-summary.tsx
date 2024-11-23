import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useFormContext, useWatch } from 'react-hook-form';
import { PurchaseDetail } from '../../../../../types/procurements/purchase';

function InvoiceSummary() {
  const { control, setValue, getValues } = useFormContext();

  const detail = useWatch({
    control: control,
    name: 'detail',
  });

  const exchange_rate = getValues('exchange_rate');

  const calculateTotalItems = () =>
    detail.reduce(
      (previousValue: number, currentValue: PurchaseDetail) =>
        previousValue + Number(currentValue?.quantity),
      0
    );

  const calculateSubtotal = () =>
    detail.reduce(
      (previousValue: number, currentValue: PurchaseDetail) =>
        previousValue + Number(currentValue?.subtotal_bs),
      0
    );

  const calculateTotal = () =>
    detail.reduce(
      (previousValue: number, currentValue: PurchaseDetail) =>
        previousValue + Number(currentValue?.total_bs),
      0
    );

  const totalItems = calculateTotalItems();
  const totalBs = calculateTotal();
  const subtotalBs = calculateSubtotal();
  const selectedCurrencyTotal = exchange_rate > 0 ? totalBs / exchange_rate : 0.00;
  const selectedCurrencySubtotal = exchange_rate > 0 ? subtotalBs / exchange_rate : 0.00;

  setValue('subtotal_bs', subtotalBs.toFixed(2));
  setValue('total_bs', totalBs.toFixed(2));
  setValue('selected_currency_total', selectedCurrencyTotal.toFixed(2));
  setValue('selected_currency_subtotal', selectedCurrencySubtotal.toFixed(2));

  return (
    <>
      <Stack
        width={1}
        direction="row"
        justifyContent='space-between'
        overflow="hidden"
        bgcolor='rgba(145, 158, 171, 0.07)'
        p={1}
      >
        <Stack direction="column" typography="subtitle2" gap={1}  textAlign='center'>
          <Box maxWidth={1} color="text.secondary" alignItems="flex-start">
            Total de artículos
          </Box>
          <Box width={160}>{parseInt(totalItems)}</Box>
        </Stack>
        <Stack direction="column" typography="subtitle2" gap={1}  textAlign='center'>
          <Box maxWidth={1} color="text.secondary" alignItems="flex-start">
            Tasa de cambio
          </Box>
          <Box width={160}>{exchange_rate}</Box>
        </Stack>
        <Stack direction="column" typography="subtitle2" gap={1}  textAlign='center'>
          <Box maxWidth={1} color="text.secondary">
            Subtotal Bs.
          </Box>
          <Box width={160} maxWidth={1}>
            ${subtotalBs.toFixed(2)}
          </Box>
        </Stack>
        <Stack direction="column" typography="subtitle2" gap={1}  textAlign='center'>
          <Box maxWidth={1} color="text.secondary">
            Subtotal USD.
          </Box>
          <Box width={160} maxWidth={1}>
            ${selectedCurrencySubtotal.toFixed(2)}
          </Box>
        </Stack>
        <Stack direction="column" typography="subtitle2" gap={1}  textAlign='center'>
          <Box>Total BS.</Box>
          <Box width={160} maxWidth={1} color="secondary.main">
            ${totalBs.toFixed(2)}
          </Box>
        </Stack>
        <Stack direction="column" typography="subtitle2" gap={1}  textAlign='center'>
          <Box>Total Divisas.</Box>
          <Box width={160} maxWidth={1} color="secondary.main">
            ${selectedCurrencyTotal.toFixed(2)}
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

export default InvoiceSummary;
