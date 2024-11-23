import Typography from '@mui/material/Typography';
import { useFormContext, useWatch } from 'react-hook-form';

function Subtotal({ index }: { index: number }) {
  const { control, setValue } = useFormContext();

  const stockValue = useWatch({
    control: control,
    name: `detail.${index}.stock`,
  });

  const priceValue = useWatch({
    control: control,
    name: `detail.${index}.price`,
  });
  const subtotal = (stockValue || 0)  * (priceValue || 0);

  setValue(`detail.${index}.subtotal`, subtotal)

  return (
    <Typography typography="subtitle2" color="text.disabled">
      ${subtotal.toFixed(2)}
    </Typography>
  );
}

export default Subtotal;
