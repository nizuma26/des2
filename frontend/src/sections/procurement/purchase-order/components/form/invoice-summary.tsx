import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { useFormContext, useWatch } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';

import {
  PurchaseOrderDetail,
  PurchaseOrderFormValues,
} from '../../../../../types/procurements/purchase-orders';
import { Tax } from '../../../../../types/configuration/tax';
import { InvoiceSummaryProps } from './types';

import { QUERY_KEYS } from '../../../../configuration/tax/context';

import TaxSearch from '../../../../common/autocompletes/tax-search';
import Typography from '@mui/material/Typography';

function InvoiceSummary({
  mainCurrencyCode,
  secondaryCurrencyCode,
  exchangeRate,
}: InvoiceSummaryProps) {
  const { control, setValue, getValues } = useFormContext<PurchaseOrderFormValues>();

  const detail = useWatch({
    control: control,
    name: 'detail',
  });

  const discount = useWatch({
    control: control,
    name: 'discount',
  });

  const taxId2 = useWatch({
    control: control,
    name: 'tax',
  });
  const taxId = getValues('tax') ?? null;

  const newTax = taxId2 === null ? taxId : taxId2

  const queryClient = useQueryClient();

  const taxes: Tax[] = queryClient.getQueryData([QUERY_KEYS.list, 'General']) ?? [];

  const tax = taxes?.find((t: Tax) => t.id === newTax) ?? null;

  const hasTax = tax?.tax ?? null;

  const calculateTotalItems = () =>
    detail.reduce(
      (previousValue: number, currentValue: PurchaseOrderDetail) =>
        previousValue + Number(currentValue?.quantity),
      0
    );

  const calculateGrossAmount = (taxValue: number) =>
    detail.reduce(
      (previousValue: number, currentValue: PurchaseOrderDetail) =>
        previousValue +
        (Number(currentValue?.quantity) * Number(currentValue?.price) +
          (currentValue.with_tax ? Number(currentValue?.price) * taxValue : 0)),
      0
    );

  const calculateTotal = () => {
    const hasTax = tax?.tax ? tax.tax / 100 : 0;
    const hasDiscount = discount ?? null;
    const grossAmount = calculateGrossAmount(hasTax);
    const discountApplied = !!hasDiscount ? grossAmount * (hasDiscount / 100) : 0;
    const netAmount = grossAmount - discountApplied;
    let secondaryNetAmount = 0;

    if (exchangeRate !== null) {
      const calculateAmount = netAmount / exchangeRate;
      secondaryNetAmount = calculateAmount;
    }

    return [netAmount, secondaryNetAmount];
  };
  const totalItems = useMemo(() => calculateTotalItems(), [detail]);
  const [totalInvoice, secondaryTotal] = useMemo(() => calculateTotal(), [detail, taxId, discount]);

  setValue('main_total', totalInvoice);
  setValue('secondary_total', secondaryTotal);

  const styleInput = {
    '& .MuiInputBase-input': {
      p: '12px',
    },
  };

  return (
    <Stack
      direction="column"
      gap={2}
      alignItems="flex-end"
      textAlign="right"
      p={3}
      overflow="hidden"
      width="auto"
      mt={2}
    >
      <Box display="flex" width={400} flexDirection="row" gap={2} alignItems="center">
        <TaxSearch
          control={control}
          name="tax"
          buttonCreate={false}
          size="small"
          setValue={setValue}
        />
        <TextField
          size="small"
          fullWidth
          type="number"
          label="Aplicar descuento"
          sx={{ ...styleInput }}
          onBlur={(event) => {
            const getDiscount = Number(event?.target?.value) ?? 0;
            setValue('discount', getDiscount);
          }}
        />
      </Box>
      <Stack maxWidth={300} spacing={2}>
        <Stack width={1} direction="row" typography="subtitle2" gap={2}>
          <Box width={1} color="text.secondary" textAlign="left">
            <Typography variant="subtitle2" noWrap textAlign="left">
              Total de artículos
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            {totalItems}
          </Box>
        </Stack>
        {secondaryCurrencyCode !== null && (
          <Stack width={1} direction="row" typography="subtitle2" gap={2}>
            <Box width={1} color="text.secondary" textAlign="left">
              <Typography variant="subtitle2" noWrap textAlign="left">
                Tasa del día
              </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              {exchangeRate}
            </Box>
          </Stack>
        )}
        <Stack width="auto" direction="row" typography="subtitle2" gap={3}>
          <Box width={1} color="text.secondary">
            <Typography variant="subtitle2" noWrap textAlign="left">
              Total {`(${mainCurrencyCode})`}
            </Typography>
          </Box>
          <Box color="error.main">${totalInvoice?.toFixed(2)}</Box>
        </Stack>
        {secondaryCurrencyCode && (
          <Stack width="auto" direction="row" typography="subtitle2" gap={3}>
            <Box width={1} color="text.secondary">
              <Typography variant="subtitle2" noWrap textAlign="left">
                Total en divisa {`(${secondaryCurrencyCode})`}
              </Typography>
            </Box>
            <Box color="error.main">${secondaryTotal?.toFixed(2)}</Box>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default InvoiceSummary;
