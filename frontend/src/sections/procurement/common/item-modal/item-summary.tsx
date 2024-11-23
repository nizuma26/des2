import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useWatch, Control } from 'react-hook-form';

import { PurchaseDetail } from '../../../../types/procurements/purchase';

import { calculateInvoice } from '../../../../utils/calculate-invoice';

interface ItemSummaryProps {
  control: Control<PurchaseDetail>;
  setValuesItemSummary: (
    subtotalBs: number,
    totalBs: number,
    selectedCurrencyCost: number,
    selectedCurrencyTotal: number,
    costWithTax: number
  ) => void;
  exchange_rate: number;
}

function ItemSummary({ control, setValuesItemSummary, exchange_rate }: ItemSummaryProps) {

  const quantity = useWatch({
    control: control,
    name: 'quantity',
  });

  const cost = useWatch({
    control: control,
    name: 'cost_bs',
  });

  const tax = useWatch({
    control: control,
    name: 'tax',
  });

  const discount = useWatch({
    control: control,
    name: 'discount',
  });

  const totalBs = calculateInvoice(cost, tax, quantity, discount);
  const subtotalBs = parseFloat(((cost || 0) * (quantity || 0)).toFixed(2));

  const selectedCurrencyCost = parseFloat(((cost || 0) / (exchange_rate || 1)).toFixed(2));
  const selectedCurrencyTotal = parseFloat(((totalBs || 0) / (exchange_rate || 1)).toFixed(2));
  const selectedCurrencySubtotal = parseFloat(((subtotalBs || 0) / (exchange_rate || 1)).toFixed(2));

  const calculateCost = (cost || 0) * ((tax || 0) / 100);

  const costWithTax = Number(cost) + Number(calculateCost);

  setValuesItemSummary(subtotalBs, totalBs, selectedCurrencyCost, selectedCurrencyTotal, costWithTax);

  return (
    <Stack
      gap={1}
      alignItems="flex-end"
      textAlign="right"
      px={3}
      py={2}
      mr={2}
      overflow="hidden"
      bgcolor="rgba(145, 158, 171, 0.06)"
      borderRadius={2}
    >
      <Stack direction="row" typography="subtitle2" gap={1}>
        <Box maxWidth={1} color="text.secondary">
          Subtotal Bs.
        </Box>
        <Box width={160} maxWidth={1}>
          <Typography variant="subtitle2" noWrap>
            {subtotalBs.toFixed(2)}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" typography="subtitle2" gap={1}>
        <Box maxWidth={1} color="text.secondary">
          Subtotal USD.
        </Box>
        <Box width={160} maxWidth={1}>
          <Typography variant="subtitle2" noWrap>
            {selectedCurrencySubtotal.toFixed(2)}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" typography="subtitle2" gap={1}>
        <Box>Total Bs.</Box>
        <Box width={160} maxWidth={1} color="secondary.main">
          <Typography variant="subtitle2" noWrap>
            {totalBs.toFixed(2)}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" typography="subtitle2" gap={1}>
        <Box>Total USD.</Box>
        <Box width={160} maxWidth={1} color="secondary.main">
          <Typography variant="subtitle2" noWrap>
            {selectedCurrencyTotal.toFixed(2)}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export default ItemSummary;
