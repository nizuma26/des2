import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { InvoiceSummaryProps } from './types';
import { OrderToBillList } from '../../../../../types/orders/order-invoice';

// -------------------------------------------------

function InvoiceSummary({ orders, setValue }: InvoiceSummaryProps) {

  const calculateMainTotal = () => {
    return orders.reduce(
      (previousValue: number, currentValue: OrderToBillList) =>
        previousValue + Number(currentValue?.main_total || 0),
      0
    )};
  
  const calculateSecondaryTotal = () => {
      return orders.reduce(
        (previousValue: number, currentValue: OrderToBillList) =>
          previousValue + Number(currentValue?.secondary_total || 0),
        0
      )};

    const total = useMemo(() => calculateMainTotal(), [orders])
    const secondaryTotal = useMemo(() => calculateSecondaryTotal(), [orders])
    const discount = 0

    setValue('total', total);
    setValue('secondary_total', secondaryTotal);
    setValue('discount', discount);

  return (
    <>
      <Stack
        direction="column"
        border="1px solid rgba(145, 158, 171, 0.2)"
        gap="5px"
        alignItems="flex-end"
        textAlign="right"
        borderRadius={1}
        p={3}
      >
        <Stack width={1} direction="column" typography="subtitle2">
          <Box width={1} display="flex" color="text.secondary">
            Total de examenes
          </Box>
          <Box
            width={1}
            display="flex"
            justifyContent="flex-end"
            bgcolor="background.neutral"
            borderRadius="3px"
            py="3px"
            px={1}
          >
            {orders.length}
          </Box>
        </Stack>
        <Stack width={1} direction="column" typography="subtitle2">
          <Box width={1} display="flex" color="text.secondary">
            IVA
          </Box>
          <Box
            width={1}
            display="flex"
            justifyContent="flex-end"
            bgcolor="background.neutral"
            borderRadius="3px"
            py="3px"
            px={1}
          >
            0 %
          </Box>
        </Stack>
        <Stack width={1} direction="column" typography="subtitle2" gap="5px">
          <Box width={1} display="flex" color="text.secondary">
            Descuento
          </Box>
          <Box
            width={1}
            display="flex"
            justifyContent="flex-end"
            bgcolor="background.neutral"
            borderRadius="3px"
            py="3px"
            px={1}
          >
            {discount}
          </Box>
        </Stack>
        <Stack width={1} direction="column" typography="subtitle2" gap="5px">
          <Box width={1} display="flex" color="text.secondary">
            Total
          </Box>
          <Box
            width={1}
            display="flex"
            justifyContent="flex-end"
            bgcolor="background.neutral"
            borderRadius="3px"
            py="3px"
            px={1}
          >
            {total?.toFixed(2)}
          </Box>
        </Stack>
        <Stack width={1} direction="column" typography="subtitle2" gap="5px">
          <Box width={1} display="flex" color="text.secondary">
            Total en divisa
          </Box>
          <Box
            width={1}
            maxWidth={1}
            bgcolor="background.neutral"
            borderRadius="3px"
            py="3px"
            px={1}
          >
            {secondaryTotal}
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

export default InvoiceSummary;
