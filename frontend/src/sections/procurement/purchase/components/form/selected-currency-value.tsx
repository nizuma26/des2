//@mui
import Typography from '@mui/material/Typography';

import { useFormContext, useWatch } from 'react-hook-form';

//-------------------------------------------------------------

interface SelectedCurrencyValueProps {
  indexField: number;
  field: string;
  value:number;
}

export const SelectedCurrencyValue = ({ indexField, field, value }: SelectedCurrencyValueProps) => {

  const { control, setValue } = useFormContext();

  const exchange_rate = useWatch({
    control: control,
    name: 'exchange_rate',
  });

  const selectedCurrencyValue = (value || 0) / (exchange_rate || 1);

  setValue(`detail.${indexField}.${field}`, selectedCurrencyValue )

  return <Typography typography="subtitle2">${selectedCurrencyValue.toFixed(2)}</Typography>;
};
