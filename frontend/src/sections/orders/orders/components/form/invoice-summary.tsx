import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useFormContext, useWatch } from 'react-hook-form';

import { OrderDetail, OrderFormValues } from '../../../../../types/orders/orders';
import { InvoiceSummaryProps } from '../types';

import { usePatient } from './use-patient';

// -------------------------------------------------

function InvoiceSummary({
  mainCurrencyCode,
  secondaryCurrencyCode,
  exchangeRate,
}: InvoiceSummaryProps) {
  const { control, setValue } = useFormContext<OrderFormValues>();

  const patient = usePatient((state) => state.patient);

  const affiliationId = useWatch({
    name: 'affiliation',
    control,
  });

  const affiliationSelected = useMemo(
    () =>
      patient?.affiliations.find((s) => {
        return s.id === affiliationId;
      }),
    [affiliationId]
  );

  // const taxId = useWatch({
  //   name: 'tax',
  //   control,
  // });

  // const queryClient = useQueryClient();

  // const taxes: Tax[] = queryClient.getQueryData([QUERY_KEYS.list]) ?? [];

  // const taxData = taxes?.find((t: Tax) => t.id === taxId) ?? { name: '', tax: 100 };

  const detail = useWatch({
    control: control,
    name: 'detail',
  });

  const calculateGrossAmount = () =>
    detail.reduce(
      (previousValue: number, currentValue: OrderDetail) =>
        previousValue + Number(currentValue?.price),
      0
    );

  const calculateDiscount = () =>
    detail.reduce(
      (previousValue: number, currentValue: OrderDetail) =>
        previousValue + (Number(currentValue.price) * Number(currentValue?.discount || 0)) / 100,
      0
    );

  const calculateNetAmount = (discount: number) => {
    //const taxApplied = grossAmount * (taxData.tax / 100);
    const grossAmount = calculateGrossAmount();
    const totalWithTaxAndDiscount = grossAmount - discount;
    const applyAgreementValue = (totalWithTaxAndDiscount * (affiliationSelected?.value || 0)) / 100;
    let netAmount = 0;
    let secondaryNetAmount = (grossAmount - discount) / exchangeRate;

    if (affiliationSelected?.concept === 'Descuento') {
      netAmount = totalWithTaxAndDiscount - applyAgreementValue;
    } else if (affiliationSelected?.concept === 'Incremento') {
      netAmount = totalWithTaxAndDiscount + applyAgreementValue;
    } else if (affiliationSelected?.concept === 'Exonerado') {
      netAmount = 0;
    } else netAmount = totalWithTaxAndDiscount;

    const total = Number(netAmount?.toFixed(4));
    const secondaryTotal = Number(secondaryNetAmount?.toFixed(4));

    return [grossAmount, total, secondaryTotal];
  };

  const discount = calculateDiscount();
  const [grossAmount, netAmount, secondaryNetAmount] = useMemo(
    () => calculateNetAmount(discount),
    [detail, affiliationSelected]
  );

  setValue('main_total', netAmount);
  setValue('secondary_total', secondaryNetAmount);
  setValue('discount', discount);

  return (
    <>
      <Stack
        direction="column"
        gap={3}
        alignItems="flex-end"
        textAlign="right"
        p={3}
        overflow="hidden"
      >
        <Stack width={1} direction="row" typography="subtitle2" gap={1}>
          <Box width={1} display="flex" color="text.secondary">
            Total de examenes
          </Box>
          <Box width={1} display="flex" justifyContent="flex-end">
            {detail?.length}
          </Box>
        </Stack>
        <Stack width={1} direction="row" typography="subtitle2" gap={1}>
          <Box width={1} display="flex" color="text.secondary">
            Monto bruto {`(${mainCurrencyCode})`}
          </Box>
          <Box width={1} display="flex" justifyContent="flex-end">
            {grossAmount.toFixed(2)}
          </Box>
        </Stack>
        {secondaryCurrencyCode && (
          <Stack width={1} direction="row" typography="subtitle2" gap={1}>
            <Box width={1} display="flex" color="text.secondary">
              Tasa de cambio
            </Box>
            <Box width={1} display="flex" justifyContent="flex-end">
              {exchangeRate}
            </Box>
          </Stack>
        )}
        <Stack width={1} direction="row" typography="subtitle2" gap={1}>
          <Box width={1} display="flex" color="text.secondary">
            Impuesto
          </Box>
          <Box width={1} display="flex" justifyContent="flex-end" color="success.main">
            0%
          </Box>
        </Stack>
        <Stack width={1} direction="row" typography="subtitle2" gap={1}>
          <Box width={1} display="flex" color="text.secondary">
            Descuento {`(${mainCurrencyCode})`}
          </Box>
          <Box width={1} display="flex" justifyContent="flex-end" color="success.main">
            {discount.toFixed(2)}
          </Box>
        </Stack>
        <Stack width={1} direction="row" typography="subtitle2" gap={1}>
          <Box width={1} display="flex">
            Total {`(${mainCurrencyCode})`}
          </Box>
          <Box width={1} display="flex" justifyContent="flex-end" color="success.main">
            {netAmount.toFixed(2)}
          </Box>
        </Stack>
        {secondaryCurrencyCode && (
          <Stack width={1} direction="row" typography="subtitle2" gap={1}>
            <Box width={1} display="flex">
              Total en divisa {`(${secondaryCurrencyCode})`}
            </Box>
            <Box width={1} maxWidth={1} color="success.main">
              {secondaryNetAmount.toFixed(2)}
            </Box>
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default InvoiceSummary;
