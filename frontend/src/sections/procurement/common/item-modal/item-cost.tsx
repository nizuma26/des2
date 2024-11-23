import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { useWatch, Control } from 'react-hook-form';

import { PurchaseDetail } from '../../../../types/procurements/purchase';
import InputAdornment from '@mui/material/InputAdornment';

interface ItemCostProps {
  control: Control<PurchaseDetail>;
}

function ItemCost({ control }: ItemCostProps) {

  const costWithTax = useWatch({
    name: 'cost_with_tax',
    control: control,
  });

  const selectedCurrencyCost = useWatch({
    name: 'selected_currency_cost',
    control: control,
  });

  const costWithTaxToFixed = Number(costWithTax?.toFixed(2))

  return (
    <Stack
      display="grid"
      gap={3}
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
      }}
    >
      <TextField
        value={costWithTaxToFixed}
        fullWidth
        type='number'
        label="Costo con impuesto"
        InputProps={{
          startAdornment: <InputAdornment position="start">Bs</InputAdornment>,
        }}
        disabled
      />
      <TextField
        value={selectedCurrencyCost}
        type='number'
        fullWidth
        label="Costo en divisas sin impuesto"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        disabled
      />
    </Stack>
  );
}

export default ItemCost;
