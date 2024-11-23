//@mui
import Typography from '@mui/material/Typography';

import { useFormContext, useWatch } from 'react-hook-form';

import { calculateInvoice } from '../../../../../utils/calculate-invoice';

//-------------------------------------------------------------

export const Total = ({indexField}: {indexField:number}) => {

  const {
    control,
    setValue
  } = useFormContext();

  const quantity = useWatch({
    control: control,
    name: `detail.${indexField}.quantity`,
  });

  const cost = useWatch({
    control: control,
    name: `detail.${indexField}.cost_bs`,
  });

  const tax = useWatch({
    control: control,
    name: `detail.${indexField}.tax`,
  });

  const discount = useWatch({
    control: control,
    name: `detail.${indexField}.discount`,
  });

  const exchange_rate = useWatch({
    control: control,
    name: 'exchange_rate',
  });

  const total = calculateInvoice(cost, tax, quantity, discount);
  const subtotal = cost && quantity ? cost * quantity : 0;

  const selectedCurrencyCost = cost && exchange_rate > 0 ? cost / exchange_rate : 0;
  const selectedCurrencyTotal = total && exchange_rate > 0 ? total / exchange_rate : 0;

  setValue(`detail.${indexField}.total_bs`, total)
  setValue(`detail.${indexField}.subtotal_bs`, subtotal)
  setValue(`detail.${indexField}.selectedCurrencyCost`, selectedCurrencyCost.toFixed(2))
  setValue(`detail.${indexField}.selectedCurrencyTotal`, selectedCurrencyTotal.toFixed(2))

  return (
    <Typography typography='subtitle2'>${total.toFixed(2)}</Typography>
  );
}
