import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useFormContext, useWatch } from 'react-hook-form';
import { BeginningInventoryFormData, Detail } from '../../../../types/beginning-inventory';

function InvoiceSummary() {
  const { control, setValue } = useFormContext<BeginningInventoryFormData>();

  const detail = useWatch({
    control: control,
    name: 'detail',
  });

  const calculateTotalItems = () =>
    detail.reduce(
      (previousValue: number, currentValue: Detail) => previousValue + Number(currentValue?.stock || 0),
      0
    );

  const calculatetotal = () =>
    detail.reduce(
      (previousValue: number, currentValue: Detail) => previousValue + Number(currentValue?.subtotal),
      0
    );

  const totalItems = calculateTotalItems();
  const total = calculatetotal();

  setValue('total', total);

  return (
    <Stack
      direction="column"
      gap={2}
      alignItems="flex-end"
      textAlign="right"
      p={3}
      overflow="hidden"
    >
      <Stack direction="row" typography="subtitle2" gap={1}>
        <Box maxWidth={1} color="text.secondary" alignItems="flex-start">
          Total de artículos
        </Box>
        <Box width={160}>{totalItems}</Box>
      </Stack>
      <Stack direction="row" typography="subtitle2" gap={1}>
        <Box>Total</Box>
        <Box width={160} maxWidth={1} color="error.main">
          ${total?.toFixed(2)}
        </Box>
      </Stack>
    </Stack>
  );
}

export default InvoiceSummary;
